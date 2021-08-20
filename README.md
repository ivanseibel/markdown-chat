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

# Architectural Detailing

Back-End

Front-End