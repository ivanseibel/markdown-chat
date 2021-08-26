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

### 2.2.
