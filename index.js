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

const userInterface = readline.createInterface({
  input: fs.createReadStream('./user.txt'),
  output: process.stdout,
  console: false
})

userInterface.on('line', (line) => {
  const words = line.split(' ')
  assert(words[1] === 'follows')
  const user = words[0]
  const follows = words.slice(2)
  // this next part was to sanitize trailing commas, not currently working
  // follows.forEach(word => {
  //   const splitword = word.split('')
  //   console.log(splitword)
  //   console.log(splitword[-1])
  //   if(splitword[-1] === ','){
  //     word = word.slice(0, -1)
  //   }
  // }) //makes problems for users with , as last char of name

  console.log(`words: ${words}, user: ${user}, follows: ${follows}`)
  users[user] = follows // this overwrites previous entries
  console.log('users: ', users)
})

const tweetInterface = readline.createInterface({
  input: fs.createReadStream('./tweet.txt'),
  output: process.stdout,
  console: false
})


tweetInterface.on('line', (line) => {

})

app.get('/', (req, res) => res.send('Hello from the server'))



const PORT = process.env.PORT || 7777
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
