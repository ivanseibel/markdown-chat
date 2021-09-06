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
  - [3.1.1. How to Run](#31_back-end)
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

#### 3.1.1. How to Run <a name = "31_back-end"></a>

##### 3.1.1.1. Install Dependencies

First of all you have to install python3 and pip to be able to run this project and install all of the dependencies.

You'll find instructions to install python3 on your system at [https://www.python.org/download/releases/3.0/](https://www.python.org/download/releases/3.0/) and pip at [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/).

I'm using [venv](https://docs.python.org/3/library/venv.html) to virtualize my Python environment, but you're free to make your choice.

To install all of the dependencies you just have to run the following command using pip and the requirements.txt file that contains all libs used by this project.

```bash
# pip install -r /path/to/requirements.txt
```


### 3.2. Front-End <a name = "32_front-end"></a>

[Front-End](https://github.com/ivanseibel/markdown-chat/tree/main/front/markdownchat/README.md)