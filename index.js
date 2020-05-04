const fs = require('fs')
const readline = require('readline')
const assert = require('assert')
const app = require('express')()
let tweets = fs.readFile('./tweet.txt', 'ascii', (err, data) => {
  if(err){
    return console.log(err)
  }
  console.log("data read")
})

let users = {}
let streams = {}

const userInterface = readline.createInterface({
  input: fs.createReadStream('./user.txt'),
  output: process.stdout,
  console: false
})

userInterface.on('line', (line) => {
  const words = line.replace(/,/g, '').split(' ') // bug: commas in usernames are removed
  assert(words[1] === 'follows')
  const user = words[0]
  const follows = words.slice(2) // takes everything in the string starting from position 2

  // console.log(`words: ${words}, user: ${user}, follows: ${follows}`)

  if(users[user]) {
    users[user] = [...users[user], ...follows]
  }  else {
    users[user] = follows // bug: this overwrites previous entries
  }
  console.log('USERS: ', users)
})


const tweetInterface = readline.createInterface({
  input: fs.createReadStream('./tweet.txt'),
  output: process.stdout,
  console: false
})


tweetInterface.on('line', (line) => {
  const words = line.split(' ')
  const tweeter = words[0].replace(/(^>)|(>$)/g, '') // Thanks StackOverflow: this should knock off the last > in the tweeter's name
  // console.log(`tweeter: `, tweeter)
  Object.keys(users).forEach((user) => {
    console.log('from inside the tweet for loop, user = ', user) // bug: Vitalik skipped for some reason
    if (users[user].includes(tweeter)) {
      if(streams[user]) {
        streams[user].push(line)
      } else {
        streams[user] = [line]
      }
    }
  })
  console.log(`STREAMS: `, streams)
})


app.get('/', (req, res) => res.send('Hello from the server'))



const PORT = process.env.PORT || 7777
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
