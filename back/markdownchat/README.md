# Markdown Webchat - Back-End

## How to Run

### Install Dependencies

First of all you have to install python3 and pip to be able to run this project and install all of the dependencies.

You'll find instructions to install python3 on your system at [https://www.python.org/download/releases/3.0/](https://www.python.org/download/releases/3.0/) and pip at [https://pip.pypa.io/en/stable/installation/](https://pip.pypa.io/en/stable/installation/).

I'm using [venv](https://docs.python.org/3/library/venv.html) to virtualize my Python environment, but you're free to make your choice.

To install all of the dependencies you just have to run the following command using pip and the requirements.txt file that contains all libs used by this project.

```bash
# pip install -r /path/to/requirements.txt
```

### Configurations

For security reasons I'm using .env files to the save secret key during programming time and the library that provides access to environment variables is `python-decouple`. You can rename file `.env.template` to `.env` and then put your security key inside and your Django app will be able to read it.

