<h1 align="center">
    <img alt="Markdown Chat" src="https://github.com/ivanseibel/markdown-chat/blob/main/front/markdownchat/src/static/logo.png?raw=true" width="200px" />
</h1>

# Markdown Chat

A real-time webchat that accepts Markdown syntax in messages sent by users.

# Motivations

The main motivation of this project was to understand how WebSocket could add value to a web application with Django by creating a real-time communication channel with the presentation layer.

As a result, the presentation layer was separated from Django and implemented as a SPA (Single Page Application) to demonstrate how this kind of real communication takes place in this architectural model.

## Back-End

Developed with Python + Django, it basically provides the WebSocket connection service and a REST endpoint for queries. The WebSocket service is implemented through the "Channels" library for Django and the REST endpoint is provided by native Django features.

An SQLite3 database was used as a means to persist and manage the list of connected users.

## Front-End

In general terms, it is a Javascript SPA (Single Page Application) that uses the React JS library.

Instead of starting with a Javascript application "from scratch", the presentation layer was built using the so-called "create-react-app" boilerplate, which adds advanced features to the project and some enablers that allow speed gain of development.

# Main Features

1. Real-time communication using WebSockets.
2. To access a room it is necessary to inform a username and the name of the room.
3. A room cannot contain more than one user with the same name.
4. The room should display a list of all users who are logged in there.
5. When a new user enters or leaves the room, a message is displayed on the timeline.
6. The room user list can be hidden and unhidden.
7. Users can format text using Markdown syntax.
8. Text input from messages allows writing on multiple lines.
9. Users can send the message using the Ctrl + Enter key combination or by clicking the Send button.
10. Responsive design following the "mobile-first" paradigm.

# Architectural Detailing

[Back-End](https://github.com/ivanseibel/markdown-chat/blob/main/back/markdownchat/README.md)

[Front-End](https://github.com/ivanseibel/markdown-chat/tree/main/front/markdownchat/README.md)