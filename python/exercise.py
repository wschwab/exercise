from collections import OrderedDict as ordered

def processUsers(userFile):
    userDict = {}
    userTxt = open(userFile, "r")
    userLines = userTxt.readlines()

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
    userDict = processUsers(userFile)
    tweetTxt = open(tweetFile, "r")
    tweetLines = tweetTxt.readlines()

    tweetStreams = ""

    for user in userDict:
        tweetStreams += f"{user}\n"
        for tweet in tweetLines:
            tweeter = tweet.partition(' ')[0][:-1] # The first [] grabs the first word, the second trims the ">"
            if tweeter in userDict[user]:
                message = tweet[len(tweeter) + 2:]
                if len(message) <= 280: # not sure about >280 failing silently, but this way loop keeps on going
                    tweetStreams = tweetStreams + f"\t@{tweeter}: {message}"
        tweetStreams += "\n"

    return tweetStreams

if __name__ == "__main__":
    print(createStreams("../user.txt", "../tweet.txt"))
