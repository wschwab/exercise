userTxt = open("user.txt", "r")
userLines = userTxt.readlines()
userDict = {}
for line in userLines:
    line = line.strip()
    user = line.partition(' ')[0]
    following = line.replace(',', '').split(' ')[2:] # bug: can't have commas in usernames
    try:
        userDict[user].update(following)
    except KeyError:
        userDict[user] =  set(following)

tweetTxt = open("tweet.txt", "r")
tweetLines = tweetTxt.readlines()

for user in userDict:
    print(f"{user}")
    for tweet in tweetLines:
        tweeter = tweet.partition(' ')[0][:-1] # The first [] grabs the first word, the second trims the ">"
        if tweeter in userDict[user]:
            message = tweet[len(tweeter) + 1:]
            print(f"\t@{tweeter}: {message}")
