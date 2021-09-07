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


# 📝 Table of Contents

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
    - [3.1.2.1. HTTP Requests (Django)](#3121_http_requests_django)
    - [3.1.2.2. WebSocket (Channels)](#3122_websocket_channels)
    - [3.1.2.3. Database (SQLite)](#3123_database_sqlite)
  - [3.1.3. Details About the Code](#313_details_about_the_code)
    - [3.1.3.1. back/markdownchat/chat/consumers.py](#3131_consumers)
      - [Database methods](#database_methods)
      - [Consumer methods](#consumer_methods)
    - [3.1.3.2. back/markdownchat/chat/models.py](#3132_models)
    - [3.1.3.3. back/markdownchat/chat/routing.py](#3133_routing)
    - [3.1.3.4. back/markdownchat/chat/urls.py](#3134_urls)
    - [3.1.3.5. back/markdownchat/chat/views.py](#3135_views)
    - [3.1.3.6. back/markdownchat/.env](#3136_env)
- [3.2. Front-End](#32_front-end)
  - [3.2.1. How to Run](#321_how_to_run)
    - [3.2.1.1. Let's talk about Create React App](#3211_lets_talk_about_create_react_app)
    - [3.2.1.2. Node and npm](#3212_node_and_npm)
    - [3.2.1.3. Installing Javascript libraries](#3213_installing_javascript_libraries)
    - [3.2.1.4. Environment variables](#3214_environment_variables)
    - [3.2.1.5. Run the project](#3215_run_the_project)
  - [3.2.2. Main Technologies](#322_main_technologies)
    - [3.2.2.1. Hooks](#3221_hooks)
    - [3.2.2.2. Context API](#3222_context_api)
    - [3.2.2.3. CSS](#3223_css)
    - [3.2.2.4. WebSocket](#3224_websocket)
    - [3.2.2.5. Markdown](#3225_markdown)
  - [3.2.3. Details About the Code](#323_details_about_the_code)
    - [3.2.3.1. front/markdownchat/src/context/room/Room.context.jsx](#3231_room_context)
    - [3.2.3.2. front/markdownchat/src/routes/index.jsx](#3232_index)
    - [3.2.3.3. front/markdownchat/src/services/api.js](#3233_api)
    - [3.2.3.4. front/markdownchat/src/ui/pages/home/Home.page.jsx](#3234_home_page)
 
# 1. Motivations <a name = "1_motivations"></a>

The main motivation of this project was to understand how WebSocket could add value to a web application with Django by creating a real-time communication channel with the presentation layer.

As a result, the presentation layer was separated from Django and implemented as a SPA (Single Page Application) to demonstrate how this kind of real communication takes place in this architectural model.

## 1.1. Back-End <a name = "11_back-end"></a>

Developed with Python + Django, it basically provides the WebSocket connection service and a REST endpoint for queries. The WebSocket service is implemented through the "Channels" library for Django and the REST endpoint is provided by native Django features.

An SQLite3 database was used as a means to persist and manage the list of connected users.

## 1.2. Front-End <a name = "12_front-end"></a>

In general terms, it is a Javascript SPA (Single Page Application) that uses the React JS library.

Instead of starting with a Javascript application "from scratch", the presentation layer was built using the so-called "create-react-app" boilerplate, which adds advanced features to the project and some enablers that allow speed gain of development.

# 2. Main Features <a name = "2_main_features"></a>

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

# 3. Architectural Detailing <a name = "3_architectural_detailing"></a>

## 3.1. Back-End <a name = "31_back-end"></a>

### 3.1.1. How to Run <a name = "311_how_to_run"></a>

#### 3.1.1.1. Install Dependencies <a name = "3111_install_dependencies"></a>

First of all you have to install python3 and pip to be able to run this project and install all of the dependencies.

You'll find instructions to install python3 on your system at [https://www.python.org/download/releases/3.0/](https://www.python.org/download/releases/3.0/) and pip at [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/).

I'm using [venv](https://docs.python.org/3/library/venv.html) to virtualize my Python environment, but you're free to make your choice.

To install all of the dependencies you just have to run the following command using pip and the requirements.txt file that contains all libs used by this project.

```bash
# pip install -r /path/to/requirements.txt
```

#### 3.1.1.2. Configurations <a name = "3112_configurations"></a>

For security reasons I'm using .env files to the save secret key during programming time and the library that provides access to environment variables is `python-decouple`. You can rename file `.env.template` to `.env` and then put your security key inside and your Django app will be able to read it.

#### 3.1.1.3. Migrations <a name = "3113_migrations"></a>

The next step is create the SQLite database and its entities using [Django Migrations](https://docs.djangoproject.com/en/3.2/topics/migrations/).

To do this, just run the following commands on your terminal inside the folder `markdown-chat/back/markdownchat/`:

```bash
# python3 manage.py makemigrations chat
# python3 manage.py migrate
```

#### 3.1.1.4. Run the Server <a name = "3114_run_the_server"></a>

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

### 3.1.2. Main Technologies <a name = "312_main_technologies"></a>

Basically, the back-end layer depends of three main technologies to implement the needed services: HTTP Requests, WebSocket and a Database.
#### 3.1.2.1. HTTP Requests (Django) <a name = "3121_http_requests_django"></a>

The first reason I adopted Django as a framework to develop this project was productivity. It's amazing how in just a few minutes you can have a working MVC application with very little code as soon as you install Django.

The second reason was the possibility to use the Channels library which is quite mature, is simple to implement on top of Django, has excellent documentation and an active community of developers who use it.

And finally, being able to use the MVC model at the beginning of the project made it easier to carry out tests by creating simple views that allowed us to better understand how Channels works at development time.

At another time I intend to replace Django with its REST version, since the project doesn't use the MVC model in production.

You can learn more about Django at [www.djangoproject.com](https://www.djangoproject.com/).

#### 3.1.2.2. WebSocket (Channels) <a name = "3122_websocket_channels"></a>

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

#### 3.1.2.3. Database (SQLite) <a name = "3123_database_sqlite"></a>

There are some reasons to use a database in this project.

The first is that you need to maintain an up-to-date list of logged-in users and the best way to do this consistently is to persist in a database. SQLite is very easy to use, offers all the necessary features and requires no installation as it is file system based.

One of the improvements I can see for this project is the introduction of the native authentication system provided by Django, in which case the database will be an important part of making this mechanism work.

Using a database system, in the near future we may save other types of information to help users get a better experience with this chat, such as favorite rooms, profile information, usage statistics, message history, advertisements, warnings and more.

You can learn more about SQLite at [sqlite.org](https://sqlite.org/index.html).

### 3.1.3. Details About the Code <a name = "313_details_about_the_code"></a>

#### 3.1.3.1. back/markdownchat/chat/consumers.py <a name = "3131_consumers"></a>

Overall, the consumer is responsible for providing a simplified way to handle the Channel's low-level ASGI implementation.

Its main objective is to structure the code as a package of methods that will be activated whenever an event related to the WebSocket occurs, avoiding that we have to write an event loop.

In addition, we have the option of working with synchronous code, as is Django's default, or asynchronous, whichever is more convenient for your project.

Below I describe the main consumer methods and their purpose.

**Database methods:** <a name = "database_methods"></a>

- `get_users_list`: Returns do banco de dados the list of users logged into a specific room.
- `get_user`: Checks no banco de dados if a specific user is logged into a specific room.
- `add_user`: Add a new user to a specific room no banco de dados.
- `remove_user`: Removes a specific user from a specific room in the database.

**Consumer methods:** <a name = "consumer_methods"></a>

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
    
#### 3.1.3.2. back/markdownchat/chat/models.py <a name = "3132_models"></a>

- `class SignedUser`: Defines the model for the table of connected users which is intended to keep an up-to-date list of all active users and rooms on the server.

#### 3.1.3.3. back/markdownchat/chat/routing.py <a name = "3133_routing"></a>

- `websocket_urlpatterns`: Defines the patterns for the WebSocket request routes and their corresponding views.

#### 3.1.3.4. back/markdownchat/chat/urls.py <a name = "3134_urls"></a>

- `urlpatterns`: Defines the patterns for the HTTP request routes and their corresponding views.

#### 3.1.3.5. back/markdownchat/chat/views.py <a name = "3135_views"></a>

- `def get_signed_user`: Returns `true` if the requested user is already logged into a specific room and `false` if not. This endpoint is used so that the presentation layer can avoid two users with the same `username` in the same room.

#### 3.1.3.6. back/markdownchat/.env <a name = "3136_env"></a>

This file simulates the use of environment variables that would be created in a production environment. There is a file named .env.template that the developers could use to fill .env file according their development environment.

From its use in a development environment, the developer can avoid sensitive information such as keys, credentials, etc. published in code versioning.

In order for the application to be able to retrieve the environment variables it is necessary to use the `python-decouple` library.

## 3.2. Front-End <a name = "32_front-end"></a>

### 3.2.1. How to Run <a name = "321_how_to_run"></a>

#### 3.2.1.1. Let's talk about Create React App <a name = "3211_lets_talk_about_create_react_app"></a>

This project was created using the `create-react-app` script to gain some time and productivity in its construction.

According to the [official React JS website](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app):

> Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.
>
> It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 10.16 and npm >= 5.6 on your machine.

You don't have to use again `create-react-app` script on this project but, as you can see above, you'll need `Node` and `npm` to run in development mode and to build the files.

#### 3.2.1.2. Node and npm <a name = "3212_node_and_npm"></a>

If you already have `Node` on your operating system, you probably also have `npm` because it's part of the `Node` package.

If you don't have `Node` yet and are using Linux or macOS, I strongly recommend installing it via `nvm` to be able to use different versions of `Node` very easily without creating confusion in your OS. You'll find detailed info about how to install `nvm` and how to use it to install your preferred `Node` version at [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm). In case you are a windows user, there is a similar project called windows-nvm about which you'll find more information at [github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows).

But if don't want to use a version manager for `Node`, you can install it using the official source at [nodejs.org](https://nodejs.org/).

And the last recommendation is to don't use `Current` version of `Node`, `LTS` is the best choice to avoid problems with incompatibilities and other kind of issues that we usually have to deal with non stable versions.

#### 3.2.1.3. Installing Javascript libraries <a name = "3213_installing_javascript_libraries"></a>

Now you are able to install all Javascript dependencies for your project.

```bash
# npm install
```

#### 3.2.1.4. Environment variables <a name = "3214_environment_variables"></a>

One of the advantages of using the `create-react-app` script is that it allows us to custom inject variables configured in the server environment. In this project I'm using an environment variable to store the base url for HTTP requests and also for WebSocket connections.

If you are running this project locally, the environment variables can be set via the `.env.development.local` file. You will notice that this file is not available in the project, but I have kept a template called `.env.template` that contains the variable names and you will only have to change its contents.

If you are in a production environment, just create the variables in the service that will provide access to the project, build the files and the variables will be automatically injected into the Javascript files.

#### 3.2.1.5. Run the project <a name = "3215_run_the_project"></a>

You're ready to go.

```bash
# npm start
```

After running `npm start`, you will see something like the image below in the terminal and your browser should automatically start on the project's home page.

```bash
Compiled successfully!

You can now view markdownchat in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.104:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### 3.2.2. Main Technologies <a name = "322_main_technologies"></a>

#### 3.2.2.1. Hooks <a name = "3221_hooks"></a>

After five years of the project, the React.js team realized that the use of classes brought some types of problems that hindered productivity, the reuse of components and even the learning curve for new developers (since Javascript `this` can have a concept somewhat different from other languages).

With the creation of version 16.8 a new paradigm called Hooks was introduced that, in general terms, allows you to use the state and other features of React without writing a class.

You can still program in React by classes, but there is a global trend of projects moving to the hook-based model and, after all, who am I to question the motives of the team that maintains the React.js project :smiley:

#### 3.2.2.2. Context API <a name = "3222_context_api"></a>

In general terms, we can say that the main feature of the Context API is to offer the possibility to share states globally within the component tree.

Let's take a quick look at the definition I got from the official website at [reactjs.org/docs/context.html](https://reactjs.org/docs/context.html):

> In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

In this project, I chose to use a context to centralize the states related to the WebSocket connection because this allowed me to easily access the necessary methods and states without having to pass props between components.

Adopting centralized state management with the Context API allowed route control with `react-router-dom` to perform user redirection automatically according to the state of the WebSocket. In addition, the `home` and `room` pages can transparently access shared methods and states as if they were implemented within those pages.

#### 3.2.2.3. CSS <a name = "3223_css"></a>

Well, in my original idea I imagined using some kind of framework, market design system or some React library for functional styles in order to save time, but as soon as I started working I realized that one of the most fun parts would be building the styles a from total zero.

From there, the design of this project was built using exclusively pure CSS without the help of other tools and according to the "mobile first" paradigm.

Unfortunately time didn't allow me to work on prototype screens before starting development, so the design was thought out and implemented directly in the code with the idea of prioritizing ease of use and minimalism of the UI.

#### 3.2.2.4. WebSocket <a name = "3224_websocket"></a>

Through the WebSocket object, Javascript offers us a complete API to communicate with the server with all the attributes, methods and events that we could possibly need. Implementing a client application with WebSocket is not complex and relies on a few flows, to understand it better you might want to take a look at the documentation provided by Mozilla [here](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications).

In this project, I chose to use a library called `react-use-websocket` which uses Javascript's WebSocket object and offers some extra facilities when implementing the methods using a React hook. For more information about this library, you can access the project link here on Github: [github.com/robtaussig/react-use-websocket](https://github.com/robtaussig/react-use-websocket).

Next, in the code detail, I'll make a more detailed explanation on how I used this library to integrate WebSocket's status, methods and events with the chat system.

#### 3.2.2.5. Markdown <a name = "3225_markdown"></a>

Originally the idea was that messages would be exchanged using only plain text without formatting, the main objective would be just to demonstrate communication using WebSocket with a web application. While building and testing the web client I realized that it could be a lot more fun to make and use if you could use text formatting and other cool features in the messages. After a quick search, Markdown was the best answer I could find for this need.

The library chosen for this purpose was `react-markdown`, which implements some improvements using the `remark` parser as a base. In fact, `remark` was considered by [www.npmtrends.com](https://www.npmtrends.com/remark-parse-vs-marked-vs-markdown-it) as the most popular Markdown parser in the world, so using that combination seemed like a really good choice.

But what really made me choose this combination were two concerns that I know `react-markdown` is already taking care of very well: security and flexibility. I'll leave the link to the projects below so that you can get to know them better, but I want to make a clipping of a part of the `react-markdown` documentation that supports what I just said:

> There are other ways for markdown in React out there so why use this one? The two main reasons are that they often rely on dangerouslySetInnerHTML or have bugs with how they handle markdown. react-markdown uses a syntax tree to build the virtual dom which allows for updating only the changing DOM instead of completely overwriting. react-markdown is 100% CommonMark (optionally GFM) compliant and has extensions to support custom syntax.

If you want to better understand what you can do with these two libraries, I recommend visiting their projects here on Github:

- [react-markdown](https://github.com/remarkjs/react-markdown)
- [remark](https://github.com/remarkjs/remark)

### 3.2.3. Details About the Code <a name = "323_details_about_the_code"></a>

#### 3.2.3.1. front/markdownchat/src/context/room/Room.context.jsx <a name = "3231_room_context"></a>

A React Context that is responsible for providing the methods, states and status that allow managing the WebSocket in a centralized way from anywhere in the application. From this context we can also make HTTP requests to retrieve important information about users, rooms, etc.

- `canConnect`: Lets you check if the username is available for the requested room. If the query returns a valid user to the room being consulted, or an error occurs, the user will be prevented from connecting.
- `onMessageHandler`: Handler responsible for handling the data package sent by the server and storing it in the room's message history, in addition to keeping the list of connected users updated.
- `handleSendMessage`: Handler that sends messages to the server.
- `handleConnect`: Handler to keep states in case connection was successfully.

#### 3.2.3.2. front/markdownchat/src/routes/index.jsx <a name = "3232_index"></a>

Responsible for automatically redirecting the user between home and chat room screens. If the user has just arrived and does not yet have a valid connection to a room, he will be directed to the Home page. If he has already entered a valid user and a valid room and successfully obtained a WebSocket connection, he will be directed to the respective room page.

#### 3.2.3.3. front/markdownchat/src/services/api.js <a name = "3233_api"></a>

Create an instance of axios so that it can be shared with the application. axios is responsible for providing an abstraction of the [Fetch API](https://www.w3schools.com/js/js_api_fetch.asp), adding improvements and extra functionality.

#### 3.2.3.4. front/markdownchat/src/ui/pages/home/Home.page.jsx <a name = "3234_home_page"></a>

Implements the user input screen where he can enter a username and the name of the room he wants to connect to. The method of connecting to the room is provided by the context described above.

- `handleOnChange`: Updates the states that hold the username and the chosen room as the user types the information on the screen.

The styles that color and beautify this page are available in a `styles.css` file which is present in the same folder as the `Home.page.jsx` page.


#### 3.4.2. front/markdownchat/src/ui/pages/room/Room.page.jsx

Implements the chat room where a logged in user can see who the other users are and send messages to the room using plain text or text with Markdown syntax (and emojis :smile:).

The styles that color and beautify this page are available in a `styles.css` file which is present in the same folder as the `Room.page.jsx` page.

- `useEffect`: This React hook is used in two specific situations with different goals.
   - Automatic scroll: we monitor incoming messages so the screen can be scrolled automatically each time there is a new message.
   - User list auto hide: when the screen has less than 600px available for rendering room content, the user list is automatically hidden.
- `handleOnChange`: Updates the state that hold the message.
- `handleMessageInputKeyDown`: User can send a message using the combination of `Ctrl+Enter` keys.
- `RoomContext`: Shares some states and methods that Room page need to work properly.
  - `isConnected`: return true if user is connected and false if not.
  - `handleSendMessage`: handler to send messages.
  - `messageHistory`: message history to show on the screen.
  - `handleConnect`: used to disconnect from the room.
  - `signedRoom`: room name where the user is connected.
  - `signedUser`: username who is connected.
  - `usersList`: users name list.

## 4. Short Captures of Key Features

### 4.1. Real-time communication using WebSockets

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-01.gif" alt="feature-01.gif">
    </td>
  </tr>
</table>

### 4.2. To access a room it is necessary to inform a username and the name of the room

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-02.gif" alt="feature-02.gif">
    </td>
  </tr>
</table>

### 4.3. A room cannot contain more than one user with the same name

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-03.gif" alt="feature-03.gif">
    </td>
  </tr>
</table>

### 4.4. The room should display a list of all users who are logged in there

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-04.gif" alt="feature-04.gif">
    </td>
  </tr>
</table>

### 4.5. When a new user enters or leaves the room, a message is displayed on the timeline

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-05.gif" alt="feature-05.gif">
    </td>
  </tr>
</table>

### 4.6. The room user list can be hidden and unhidden

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-06.gif" alt="feature-06.gif">
    </td>
  </tr>
</table>

### 4.7. Users can format text using Markdown syntax

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-07.gif" alt="feature-07.gif">
    </td>
  </tr>
</table>

### 4.8. Text input of messages allows writing on multiple lines

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-08.gif" alt="feature-08.gif">
    </td>
  </tr>
</table>

### 4.9. Users can send the message Ctrl+Enter or by clicking the Send button

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-09.gif" alt="feature-09.gif">
    </td>
  </tr>
</table>

### 4.10. Responsive design following the "mobile-first" paradigm

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/markdown-chat/blob/7d398ad5fcc4ae9e4fe5aa43df6333a0cfaf85a3/front/markdownchat/src/static/screencaptures/feature-10.gif" alt="feature-10.gif">
    </td>
  </tr>
</table>
