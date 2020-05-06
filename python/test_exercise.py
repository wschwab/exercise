from .exercise import *
from os import remove # to clean up test txt files
import pytest

def validate_users(userTxt):
    users = open(userTxt, "r").readlines()
    for user in users:
        split_user = user.strip().split(' ')
        assert user != '', "user cannot be empty"
        assert split_user[1] == "follows", "source should state 'follows' after username"

def validate_tweet(tweetTxt):
    tweets = open(tweetTxt, "r").readlines()
    for tweet in tweets:
        message = tweet.strip().split(' ')[1:]
        assert len(message) <= 280, "message must be 280 or less characters"

def test_processUsers():
    userTxt = open("test_users.txt", "w")
    userTxt.write("foo follows bar\nbar follows\nbaz follows foo, bar")
    userTxt.close()
    validate_users("test_users.txt")
    assert processUsers("test_users.txt") == {"foo": {"bar"}, "bar": None, "baz": {"foo", "bar"}}
    remove("test_users.txt")

def test_createStreams():
    pass
