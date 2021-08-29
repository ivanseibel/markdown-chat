# Markdown Webchat - Front-End

## List Of Items

- [1. How to Run](#1-how-to-run)
  - [1.1. Install Dependencies](#11-install-dependencies)
    - [1.1.1. Let's talk about Create React App](#111-lets-talk-about-create-react-app)
    - [1.1.2. Node and npm](#112-node-and-npm)
    - [1.1.3. Installing Javascript libraries](#113-installing-javascript-libraries)
    - [1.1.4. Environment variables](#114-environment-variables)
    - [1.1.5. Run the project](#115-run-the-project)
- [2. Main Technologies](#2-main-technologies)
  - [2.1. Hooks](#21-hooks)
  - [2.2. Context API](#22-context-api)
  - [2.3. CSS](#23-css)
  - [2.4. WebSocket](#24-websocket)
  - [2.5. Markdown](#25-markdown)
- [3. Details About the Code](#3-details-about-the-code)
  - [3.1. Context](#31-context)
    - [3.1.1 front/markdownchat/src/context/room/Room.context.jsx](#311-frontmarkdownchatsrccontextroomroomcontextjsx)
  - [3.2. Routes](#32-routes)
    - [3.2.1 front/markdownchat/src/routes/index.jsx](#321-frontmarkdownchatsrcroutesindexjsx)
  - [3.3. Services](#33-services)
    - [3.3.1. front/markdownchat/src/services/api.js](#331-frontmarkdownchatsrcservicesapijs)
  - [3.4. UI](#34-UI)
    - [3.4.1. front/markdownchat/src/ui/pages/home/Home.page.jsx](#341-frontmarkdownchatsrcuipageshomeHomepagejsx)
    - [3.4.2. front/markdownchat/src/ui/pages/room/Room.page.jsx](#342-frontmarkdownchatsrcuipagesroomroompagejsx)
- [4. Short Captures of Key Features](#4-short-captures-of-key-features)

## 1. How to Run

### 1.1. Install Dependencies

#### 1.1.1. Let's talk about Create React App

This project was created using the `create-react-app` script to gain some time and productivity in its construction.

According to the [official React JS website](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app):

> Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.
>
> It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 10.16 and npm >= 5.6 on your machine.

You don't have to use again `create-react-app` script on this project but, as you can see above, you'll need `Node` and `npm` to run in development mode and to build the files.

#### 1.1.2. Node and npm

If you already have `Node` on your operating system, you probably also have `npm` because it's part of the `Node` package.

If you don't have `Node` yet and are using Linux or macOS, I strongly recommend installing it via `nvm` to be able to use different versions of `Node` very easily without creating confusion in your OS. You'll find detailed info about how to install `nvm` and how to use it to install your preferred `Node` version at [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm). In case you are a windows user, there is a similar project called windows-nvm about which you'll find more information at [github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows).

But if don't want to use a version manager for `Node`, you can install it using the official source at [nodejs.org](https://nodejs.org/).

And the last recommendation is to don't use `Current` version of `Node`, `LTS` is the best choice to avoid problems with incompatibilities and other kind of issues that we usually have to deal with non stable versions.

#### 1.1.3. Installing Javascript libraries

Now you are able to install all Javascript dependencies for your project.

```bash
# npm install
```

#### 1.1.4. Environment variables

One of the advantages of using the `create-react-app` script is that it allows us to custom inject variables configured in the server environment. In this project I'm using an environment variable to store the base url for HTTP requests and also for WebSocket connections.

If you are running this project locally, the environment variables can be set via the `.env.development.local` file. You will notice that this file is not available in the project, but I have kept a template called `.env.template` that contains the variable names and you will only have to change its contents.

If you are in a production environment, just create the variables in the service that will provide access to the project, build the files and the variables will be automatically injected into the Javascript files.

#### 1.1.5. Run the project

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

## 2. Main Technologies

### 2.1. Hooks

After five years of the project, the React.js team realized that the use of classes brought some types of problems that hindered productivity, the reuse of components and even the learning curve for new developers (since Javascript `this` can have a concept somewhat different from other languages).

With the creation of version 16.8 a new paradigm called Hooks was introduced that, in general terms, allows you to use the state and other features of React without writing a class.

You can still program in React by classes, but there is a global trend of projects moving to the hook-based model and, after all, who am I to question the motives of the team that maintains the React.js project :smiley:

### 2.2. Context API

In general terms, we can say that the main feature of the Context API is to offer the possibility to share states globally within the component tree.

Let's take a quick look at the definition I got from the official website at [reactjs.org/docs/context.html](https://reactjs.org/docs/context.html):

> In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

In this project, I chose to use a context to centralize the states related to the WebSocket connection because this allowed me to easily access the necessary methods and states without having to pass props between components.

Adopting centralized state management with the Context API allowed route control with `react-router-dom` to perform user redirection automatically according to the state of the WebSocket. In addition, the `home` and `room` pages can transparently access shared methods and states as if they were implemented within those pages.

### 2.3. CSS

Well, in my original idea I imagined using some kind of framework, market design system or some React library for functional styles in order to save time, but as soon as I started working I realized that one of the most fun parts would be building the styles a from total zero.

From there, the design of this project was built using exclusively pure CSS without the help of other tools and according to the "mobile first" paradigm.

Unfortunately time didn't allow me to work on prototype screens before starting development, so the design was thought out and implemented directly in the code with the idea of prioritizing ease of use and minimalism of the UI.

### 2.4. WebSocket

Through the WebSocket object, Javascript offers us a complete API to communicate with the server with all the attributes, methods and events that we could possibly need. Implementing a client application with WebSocket is not complex and relies on a few flows, to understand it better you might want to take a look at the documentation provided by Mozilla [here](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications).

In this project, I chose to use a library called `react-use-websocket` which uses Javascript's WebSocket object and offers some extra facilities when implementing the methods using a React hook. For more information about this library, you can access the project link here on Github: [github.com/robtaussig/react-use-websocket](https://github.com/robtaussig/react-use-websocket).

Next, in the code detail, I'll make a more detailed explanation on how I used this library to integrate WebSocket's status, methods and events with the chat system.

### 2.5. Markdown

Originally the idea was that messages would be exchanged using only plain text without formatting, the main objective would be just to demonstrate communication using WebSocket with a web application. While building and testing the web client I realized that it could be a lot more fun to make and use if you could use text formatting and other cool features in the messages. After a quick search, Markdown was the best answer I could find for this need.

The library chosen for this purpose was `react-markdown`, which implements some improvements using the `remark` parser as a base. In fact, `remark` was considered by [www.npmtrends.com](https://www.npmtrends.com/remark-parse-vs-marked-vs-markdown-it) as the most popular Markdown parser in the world, so using that combination seemed like a really good choice.

But what really made me choose this combination were two concerns that I know `react-markdown` is already taking care of very well: security and flexibility. I'll leave the link to the projects below so that you can get to know them better, but I want to make a clipping of a part of the `react-markdown` documentation that supports what I just said:

> There are other ways for markdown in React out there so why use this one? The two main reasons are that they often rely on dangerouslySetInnerHTML or have bugs with how they handle markdown. react-markdown uses a syntax tree to build the virtual dom which allows for updating only the changing DOM instead of completely overwriting. react-markdown is 100% CommonMark (optionally GFM) compliant and has extensions to support custom syntax.

If you want to better understand what you can do with these two libraries, I recommend visiting their projects here on Github:

- [react-markdown](https://github.com/remarkjs/react-markdown)
- [remark](https://github.com/remarkjs/remark)

## 3. Details About the Code

### 3.1. Context

#### 3.1.1 front/markdownchat/src/context/room/Room.context.jsx

A React Context that is responsible for providing the methods, states and status that allow managing the WebSocket in a centralized way from anywhere in the application. From this context we can also make HTTP requests to retrieve important information about users, rooms, etc.

- `canConnect`: Lets you check if the username is available for the requested room. If the query returns a valid user to the room being consulted, or an error occurs, the user will be prevented from connecting.
- `onMessageHandler`: Handler responsible for handling the data package sent by the server and storing it in the room's message history, in addition to keeping the list of connected users updated.
- `handleSendMessage`: Handler that sends messages to the server.
- `handleConnect`: Handler to keep states in case connection was successfully.

### 3.2. Routes

#### 3.2.1 front/markdownchat/src/routes/index.jsx

Responsible for automatically redirecting the user between home and chat room screens. If the user has just arrived and does not yet have a valid connection to a room, he will be directed to the Home page. If he has already entered a valid user and a valid room and successfully obtained a WebSocket connection, he will be directed to the respective room page.

### 3.3. Services

#### 3.3.1. front/markdownchat/src/services/api.js

Create an instance of axios so that it can be shared with the application. axios is responsible for providing an abstraction of the [Fetch API](https://www.w3schools.com/js/js_api_fetch.asp), adding improvements and extra functionality.

### 3.4. UI

#### 3.4.1. front/markdownchat/src/ui/pages/home/Home.page.jsx

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
