<h3 align="center">
    <img alt="Markdown Chat" src="https://github.com/ivanseibel/markdown-chat/blob/main/front/markdownchat/src/static/logo.png?raw=true" width="200px" />
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ivanseibel/markdown-chat?color=plastic">

  <a href="https://github.com/ivanseibel">
    <img alt="Made by Ivan Seibel" src="https://img.shields.io/badge/Made%20by-Ivan%20Seibel-plastic">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/ivanseibel/markdown-chat?color=plastic">

  <a href="https://github.com/ivanseibel/markdown-chat/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/ivanseibel/markdown-chat?color=plastic">
  </a>
</p>

---

<p align="center">A real-time multi room webchat that accepts Markdown syntax in messages sent by users.
    <br> 
</p>


## 📝 Table of Contents

- [1. Motivations](#1_motivations)
  - [1.1. Back-End](#11_back-end)
  - [1.2. Front-End](#12_front-end)
- [2. Main Features](#2_main_features)
- [3. Architectural Detailing](#3_architectural_detailing)
- [3.1. Back-End](#31_back-end)
  - [3.1.1. How to Run](#311_how_to_run)
    - [3.1.1.1. Install Dependencies](#3111_install_dependencies)
    - [3.1.1.2. Configurations](#3112_configurations)
    - [3.1.1.3. Migrations](#3113_migrations)
    - [3.1.1.4. Run the Server](#3114_run_the_server)
  - [3.1.2. Main Technologies](#312_main_technologies)
- [3.2. Front-End](#32_front-end)

 

## 1. Motivations <a name = "1_motivations"></a>

The main motivation of this project was to understand how WebSocket could add value to a web application with Django by creating a real-time communication channel with the presentation layer.

As a result, the presentation layer was separated from Django and implemented as a SPA (Single Page Application) to demonstrate how this kind of real communication takes place in this architectural model.

### 1.1. Back-End <a name = "11_back-end"></a>

Developed with Python + Django, it basically provides the WebSocket connection service and a REST endpoint for queries. The WebSocket service is implemented through the "Channels" library for Django and the REST endpoint is provided by native Django features.

An SQLite3 database was used as a means to persist and manage the list of connected users.

### 1.2. Front-End <a name = "12_front-end"></a>

In general terms, it is a Javascript SPA (Single Page Application) that uses the React JS library.

Instead of starting with a Javascript application "from scratch", the presentation layer was built using the so-called "create-react-app" boilerplate, which adds advanced features to the project and some enablers that allow speed gain of development.

## 2. Main Features <a name = "2_main_features"></a>

1. Real-time communication using WebSockets.
2. To access a room it is necessary to inform a username and the name of the room.
3. A room cannot contain more than one user with the same name.
4. The room should display a list of all users who are logged in there.
5. When a new user enters or leaves the room, a message is displayed on the timeline.
6. The room user list can be hidden and unhidden.
7. Users can format text using Markdown syntax.
8. Text input of messages allows writing on multiple lines.
9. Users can send the message Ctrl+Enter or by clicking the Send button.
10. Responsive design following the "mobile-first" paradigm.

## 3. Architectural Detailing <a name = "3_architectural_detailing"></a>

### 3.1. Back-End <a name = "31_back-end"></a>

#### 3.1.1. How to Run <a name = "311_how_to_run"></a>

##### 3.1.1.1. Install Dependencies <a name = "3111_install_dependencies"></a>

First of all you have to install python3 and pip to be able to run this project and install all of the dependencies.

You'll find instructions to install python3 on your system at [https://www.python.org/download/releases/3.0/](https://www.python.org/download/releases/3.0/) and pip at [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/).

I'm using [venv](https://docs.python.org/3/library/venv.html) to virtualize my Python environment, but you're free to make your choice.

To install all of the dependencies you just have to run the following command using pip and the requirements.txt file that contains all libs used by this project.

```bash
# pip install -r /path/to/requirements.txt
```

##### 3.1.1.2. Configurations <a name = "3112_configurations"></a>

For security reasons I'm using .env files to the save secret key during programming time and the library that provides access to environment variables is `python-decouple`. You can rename file `.env.template` to `.env` and then put your security key inside and your Django app will be able to read it.

##### 3.1.1.3. Migrations <a name = "3113_migrations"></a>

The next step is create the SQLite database and its entities using [Django Migrations](https://docs.djangoproject.com/en/3.2/topics/migrations/).

To do this, just run the following commands on your terminal inside the folder `markdown-chat/back/markdownchat/`:

```bash
# python3 manage.py makemigrations chat
# python3 manage.py migrate
```

##### 3.1.1.4. Run the Server <a name = "3114_run_the_server"></a>

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

#### 3.1.2. Main Technologies <a name = "312_main_technologies"></a>

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

- `websocket_urlpatterns`: Defines the patterns for the WebSocket request routes and their corresponding views.

### 3.4. back/markdownchat/chat/urls.py

- `urlpatterns`: Defines the patterns for the HTTP request routes and their corresponding views.

### 3.5. back/markdownchat/chat/views.py

- `def get_signed_user`: Returns `true` if the requested user is already logged into a specific room and `false` if not. This endpoint is used so that the presentation layer can avoid two users with the same `username` in the same room.

### 3.6. back/markdownchat/.env

This file simulates the use of environment variables that would be created in a production environment. There is a file named .env.template that the developers could use to fill .env file according their development environment.

From its use in a development environment, the developer can avoid sensitive information such as keys, credentials, etc. published in code versioning.

In order for the application to be able to retrieve the environment variables it is necessary to use the `python-decouple` library.

### 3.2. Front-End <a name = "32_front-end"></a>

[Front-End](https://github.com/ivanseibel/markdown-chat/tree/main/front/markdownchat/README.md)