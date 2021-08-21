<h3 align="center">
    <img alt="Markdown Chat" src="https://github.com/ivanseibel/markdown-chat/blob/main/front/markdownchat/src/static/logo.png?raw=true" width="200px" />
</h3>

# Markdown Webchat - Back-End

## List Of Items

- [1. How to Run](#1-how-to-run)
  - [1.1. Install Dependencies](#11-install-dependencies)
  - [1.2. Configurations](#12-configurations)
  - [1.3. Migrations](#13-migrations)
  - [1.4. Run the Server](#14-run-the-server)

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