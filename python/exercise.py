from chardet import detect
from collections import OrderedDict as ordered

def checkAscii(file):
    fileBytes = open(file, 'rb').read()
    if detect(fileBytes)["encoding"] != 'ascii':
        raise TypeError("""
            Part or all of the {file} input file is not encoded in ASCII\n
            Input files must be encoded in ASCII
        """)

def processUsers(userFile):
    # print("USER FILE: " + userFile)
    checkAscii(userFile)

    userDict = {}
    userTxt = open(userFile, "r")
    userLines = userTxt.readlines()

    # check emptiness
    empty= True
    for line in userLines:
        if len(line.split(' ')) >= 2 and line.split(' ')[1] == "follows":
            empty = False
            break
    if empty:
        raise TypeError("""
            The {file} is either empty or improperly formatted
        """)

    for line in userLines:
        line = line.strip()
        user = line.partition(' ')[0]
        splitUser = line.replace(',', '').split(' ') # bug: can't have commas in usernames
        if len(splitUser) >= 3:
            following = splitUser[2:]
            try:
                userDict[user].update(following)
            except KeyError:
                userDict[user] =  set(following)
        else:
            if user not in userDict:
                userDict[user] = []

    # Ordered dictionaries let us alphabetize the keys to the dictionary
    userDict = ordered(sorted(userDict.items()))

    return userDict

def createStreams(userFile, tweetFile):
    checkAscii(tweetFile)

    userDict = processUsers(userFile)
    tweetTxt = open(tweetFile, "r")
    tweetLines = tweetTxt.readlines()

    # check emptiness
    empty= True
    for line in tweetLines:
        # potential bug: tweets full of spaces but empty pass
        if len(line.split(' ')) >= 2 and line.split(' ')[0][-1] == '>':
            empty = False
            break
    if empty:
        raise TypeError("""
            The {file} is either empty or improperly formatted
        """)

    tweetStreams = ""

    for user in userDict:
        tweetStreams += f"{user}\n"
        for tweet in tweetLines:
            tweeter = tweet.partition(' ')[0][:-1] # The first [] grabs the first word, the second trims the ">"
            if tweeter in userDict[user]:
                message = tweet[len(tweeter) + 2:]
                if len(message) <= 280: # As requested, > 280 doesn't crash, but isn't printed
                    tweetStreams = tweetStreams + f"\t@{tweeter}: {message}"
        tweetStreams += "\n"

    return tweetStreams

if __name__ == "__main__":
    print(createStreams("../user.txt", "../tweet.txt"))
