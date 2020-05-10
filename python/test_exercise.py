from .exercise import *
import codecs # needed to write utf-8 to a file
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
        assert tweet != '', "tweet cannot be empty"
        split_tweet = tweet.strip().split(' ')
        assert len(tweet) >= 2, "tweet must contain username"
        user = split_tweet[0]
        message = split_tweet[1:]
        assert user[-1] == ">", "tweet must be formatted {user}> {tweet}"
        assert len(message) <= 280, "message must be 280 or less characters"

def test_checkAscii():
    uniTxt = codecs.open("test_ascii.txt", "w")
    uniTxt.write(u'some text to be encoded in utf-8')
    uniTxt.close()
    with pytest.raises(Exception):
        assert checkAscii("test_ascii.txt")
    remove("test_ascii.txt")

def test_processUsers():
    userTxt = open("test_users.txt", "w")
    userTxt.write("foo follows bar\nbar follows\nbaz follows foo, bar\nfoo follows foo")
    userTxt.close()
    assert processUsers("test_users.txt") == {"foo": {"foo", "bar"}, "bar": [], "baz": {"foo", "bar"}}
    remove("test_users.txt")

def test_createStreams():
    tweetTxt = open("test_tweets.txt", "w")
    tweetTxt.write("foo> foo!\nbar> bar!\nbaz> baz!")
    tweetTxt.close()
    # validate_tweet("test_tweets.txt")
    userTxt = open("test_users.txt", "w")
    userTxt.write("foo follows bar\nbar follows\nbaz follows foo, bar\nfoo follows foo")
    userTxt.close()
    expected_output = "bar\n\nbaz\n\t@foo: foo!\n\t@bar: bar!\n\nfoo\n\t@foo: foo!\n\t@bar: bar!\n\n"
    assert createStreams("test_users.txt", "test_tweets.txt") == expected_output
    remove("test_tweets.txt")
    remove("test_users.txt")

def test_emptiness():
    userTxt = open("test_users.txt", "w")
    userTxt.write("     ")
    userTxt.close()
    with pytest.raises(Exception):
        assert processUsers("test_users.txt")
    remove("test_users.txt")
    tweetTxt = open("test_tweets.txt", "w")
    tweetTxt.write("     ")
    tweetTxt.close()
    with pytest.raises(Exception):
        assert processUsers("test_tweets.txt")
    remove("test_tweets.txt")
