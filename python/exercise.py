userDict = {}

def processUsers(userFile):
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
                userDict[user] = None

    return userDict

def createStreams(userFile, tweetFile):
    processUsers(userFile)
    tweetTxt = open(tweetFile, "r")
    tweetLines = tweetTxt.readlines()

    for user in userDict:
        print(f"{user}")
        for tweet in tweetLines:
            tweeter = tweet.partition(' ')[0][:-1] # The first [] grabs the first word, the second trims the ">"
            if tweeter in userDict[user]:
                message = tweet[len(tweeter) + 1:]
                if len(message) <= 280: # not sure about >280 failing silently, but this way loop keeps on going
                    print(f"\t@{tweeter}: {message}")

if __name__ == "__main__":
    createStreams("../user.txt", "../tweet.txt")
