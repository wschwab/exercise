const fs = require('fs')
const readline = require('readline')
const assert = require('assert')
const app = require('express')()

app.get('/', (req, res) => res.send('Hello from the server'))



const PORT = process.env.PORT || 7777
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

const users = {}
const streams = {}

async function createUsers() {
  const fileStream = fs.createReadStream('../user.txt')
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // per StackOverflow 'Read a file one line at a time in node.js'
  })

  for await (const line of rl) {
    const words = line.replace(/,/g, '').split(' ') // bug: commas in usernames are removed
    assert(words[1] === 'follows')
    const user = words[0]
    const follows = words.slice(2) // takes everything in the string starting from position 2

    if(users[user]) {
      users[user] = [...users[user], ...follows] // allows repeat entries: a set would be better
    }  else {
      users[user] = follows
    }
  }
}


async function createStreams() {
  createUsers()

  const fileStream = fs.createReadStream('../tweet.txt')
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    const words = line.split(' ')
    const tweeter = words[0].replace(/(^>)|(>$)/g, '') // Thanks StackOverflow: this should knock off the last > in the tweeter's name
    for (const [ user, follows ] of Object.entries(users)) {
      if (follows.includes(tweeter)) {
        if(streams[user]) {
          streams[user] = [...streams[user], line]
        } else {
          streams[user] = [line]
        }
      }
    }
  }
  console.log(streams)
}

createStreams()
