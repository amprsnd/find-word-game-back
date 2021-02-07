const express = require('express')
const cors = require('cors')
const faker = require('faker')

const app = express()

app.use(cors())

let words = []
const maxWords = 20

app.get('/init', (req, res) => {
  words = []
  for (let i = 0; i < maxWords;) {
    let word = faker.random.word()
    if (!word.includes('-') && !words.includes(word)) {
      words.push(word)
      i++
    }
  }
  console.log('===============================')
  console.log('Init game')
  console.log('Words:', words)
  console.log('===============================')

  res.json({ words: words })
})

app.get('/answer', (req, res) => {
  const answer = { 
    answer: words.splice(0, 1)[0] || '',
    author: {
      name: faker.fake('{{name.firstName}} {{name.lastName}}'),
      picture: `https://robohash.org/${faker.random.uuid()}.png?set=set4`,
    }
  }
  console.log('===============================')
  console.log('Get answer')
  console.log('Author:', answer.author.name, ', word:', answer.answer)
  console.log('===============================')

  res.json(answer)
})

app.get('/stats', (req, res) => {
  res.json({
    totalWords: maxWords,
    round: maxWords - words.length
  })
})

app.listen(3000, () => {
  console.log('===============================')
  console.log('App listening at http://localhost:3000')
  console.log('===============================')
})
