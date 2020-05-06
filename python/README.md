Detailed instructions for running the Python code in this repo (including tests) follow.

It is assumed that there is already an installation of Python 3.x and Pip.

#### Cloning the repo

```
$ git clone https://github.com/wschwab/exercise
$ cd exercise/python
```

#### Setting up a virtual environment

This project uses `pipenv` for creating virtual environments (a venv).

```
$ sudo pip3 install pipenv
$ pipenv shell

```
Successful intialization should change the prompt to the following:
```
(python) $
```

#### Setting up Pytest

The test were written with Pytest in mind.

```
(python) $ pipenv install pytest-watch
```

This will install Pytest in this environment only, and create a `pipfile` (a feature of `pipenv`).

#### Running the code
To see the result of the main code (using the supplied user.txt and tweet.txt) simply run the following from within the directory:
```
(python) $ python3 exercise.py
```
To run the tests, simply type:
```
py.test
```
While you don't need to be in a venv to run the main code, you will for Pytest (since it's only installed in the venv).
