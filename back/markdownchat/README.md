# Markdown Webchat - Back-End

## List Of Items

- [1. How to Run](#1-how-to-run)
  - [1.1. Install Dependencies](#11-install-dependencies)
  - [1.2. Configurations](#12-configurations)
  - [1.3. Migrations](#13-migrations)
  - [1.4. Run the Server](#14-run-the-server)
- [2. Main Technologies](#2-main-technologies)
  - [2.1. HTTP Requests](#21-http-requests-django)
  - [2.2. WebSocket](#22-websocket-channels)
  - [2.3. Database](#23-database-sqlite)
- [3. Details About the Code](#3-details-about-the-code)
  - [3.1. back/markdownchat/chat/consumers.py](#31-backmarkdownchatchatconsumerspy)
    - [3.1.1. Database methods](#311-database-methods)
    - [3.1.2. Consumer methods](#312-consumer-methods)
- [3.2. back/markdownchat/chat/models.py](#32-backmarkdownchatchatmodelspy)
- [3.3. back/markdownchat/chat/routing.py]()
## 1. How to Run

### 1.1. Install Dependencies

First of all you have to install python3 and pip to be able to run this project and install all of the dependencies.

You'll find instructions to install python3 on your system at [https://www.python.org/download/releases/3.0/](https://www.python.org/download/releases/3.0/) and pip at [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/).

I'm using [venv](https://docs.python.org/3/library/venv.html) to virtualize my Python environment, but you're free to make your choice.

To install all of the dependencies you just have to run the following command using pip and the requirements.txt file that contains all libs used by this project.

```bash
# pip install -r /path/to/requirements.txt
```

### 1.2. Configurations

For security reasons I'm using .env files to the save secret key during programming time and the library that provides access to environment variables is `python-decouple`. You can rename file `.env.template` to `.env` and then put your security key inside and your Django app will be able to read it.

### 1.3. Migrations

The next step is create the SQLite database and its entities using [Django Migrations](https://docs.djangoproject.com/en/3.2/topics/migrations/).

To do this, just run the following commands on your terminal inside the folder `markdown-chat/back/markdownchat/`:

```bash
# python3 manage.py makemigrations chat
# python3 manage.py migrate
```

### 1.4. Run the Server

Right now you'll be able to run the server to get your app ready to receive new connections.

```bash
# python3 manage.py runserver
```

After that you'll see some outputs on your terminal similar to this:

```bash
System check identified no issues (0 silenced).
August 21, 2021 - 23:11:22
Django version 3.2.5, using settings 'markdownchat.settings'
Starting ASGI/Channels version 3.0.4 development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

## 2. Main Technologies

Basically, the back-end layer depends of three main technologies to implement the needed services: HTTP Requests, WebSocket and a Database.
### 2.1. HTTP Requests (Django)

The first reason I adopted Django as a framework to develop this project was productivity. It's amazing how in just a few minutes you can have a working MVC application with very little code as soon as you install Django.

The second reason was the possibility to use the Channels library which is quite mature, is simple to implement on top of Django, has excellent documentation and an active community of developers who use it.

And finally, being able to use the MVC model at the beginning of the project made it easier to carry out tests by creating simple views that allowed us to better understand how Channels works at development time.

At another time I intend to replace Django with its REST version, since the project doesn't use the MVC model in production.

You can learn more about Django at [www.djangoproject.com](https://www.djangoproject.com/).

### 2.2. WebSocket (Channels)

Channels description from Channels documentation.

> Channels is a project that takes Django and extends its abilities beyond HTTP - to handle WebSockets, chat protocols, IoT protocols, and more. It’s built on a Python specification called ASGI.

Channels allow us to implement the protocol that provides all communication between server and clients in real-time through the Consumer layer that could be compared to the Django Views layer. 

To make it easier to understand how Channels works, let's take a look at the diagram below:

<p align="center">
    <img alt="Markdown Chat" src="https://github.com/ivanseibel/markdown-chat/blob/main/front/markdownchat/src/static/1473343845-django-wsgi.png?raw=true" width="500px" />
    <br />
    <span align="center">Source: <a href="https://blog.heroku.com/in_deep_with_django_channels_the_future_of_real_time_apps_in_django" target="_blank" rel="noopener">Heroku Blog Post</a></span>
</p>

You can learn more about Channels at [channels.readthedocs.io](https://channels.readthedocs.io/en/stable/index.html).
### 2.3. Database (SQLite)

There are some reasons to use a database in this project.

The first is that you need to maintain an up-to-date list of logged-in users and the best way to do this consistently is to persist in a database. SQLite is very easy to use, offers all the necessary features and requires no installation as it is file system based.

One of the improvements I can see for this project is the introduction of the native authentication system provided by Django, in which case the database will be an important part of making this mechanism work.

Using a database system, in the near future we may save other types of information to help users get a better experience with this chat, such as favorite rooms, profile information, usage statistics, message history, advertisements, warnings and more.

You can learn more about SQLite at [sqlite.org](https://sqlite.org/index.html).

## 3. Details About the Code

### 3.1. back/markdownchat/chat/consumers.py

Overall, the consumer is responsible for providing a simplified way to handle the Channel's low-level ASGI implementation.

Its main objective is to structure the code as a package of methods that will be activated whenever an event related to the WebSocket occurs, avoiding that we have to write an event loop.

In addition, we have the option of working with synchronous code, as is Django's default, or asynchronous, whichever is more convenient for your project.

Below I describe the main consumer methods and their purpose.

#### 3.1.1. Database methods:

- `get_users_list`: Returns do banco de dados the list of users logged into a specific room.
- `get_user`: Checks no banco de dados if a specific user is logged into a specific room.
- `add_user`: Add a new user to a specific room no banco de dados.
- `remove_user`: Removes a specific user from a specific room in the database.

#### 3.1.2. Consumer methods:

- `connect`: When socket connection is created.
  - Get route data to identify room name and username.
  - Checks if the user is already logged in to a specific room and rejects if true.
  - Adds the user to the list of logged in users for the room.
  - Adds the new connection to the room group.
  - Sends a message to the room informing you that a new user has joined.

- `disconnect`: Triggered when socked connection is closed.
  - Remove disconnected user from the users list.
  - Sends a message to the room that a user has left.
  - Leave room group

- `receive`: Triggered when receives a new message from WebSocket.
  - Get data and redirect to the specific room according the message type.

- `chat_message`: Send data to a specific room.
  - Get the list of connected users at a specific room.
  - Send data to WebSocket.
    
### 3.2. back/markdownchat/chat/models.py

- `class SignedUser`: Defines the model for the table of connected users which is intended to keep an up-to-date list of all active users and rooms on the server.

### 3.3. back/markdownchat/chat/routing.py