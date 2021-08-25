# Markdown Webchat - Front-End

## List Of Items

- [1. How to Run](#1-how-to-run)
  - [1.1. Install Dependencies](#11-install-dependencies)
    - [1.1.1. Let's talk about Create React App](#111-lets-talk-about-create-react-app)
    - [1.1.2. Node and npm](#112-node-and-npm)
    - [1.1.3. Installing Javascript libraries](#113-installing-javascript-libraries)
    - [1.1.4. Environment variable](#114-environment-variable)
    - [1.1.5. Run the project](#115-run-the-project)

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

#### 1.1.4. Environment variable

Describing...

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

