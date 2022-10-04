const cors = require('cors')
const express = require('express')
const app = express()
// app.use(cors())
const bodyParser = require('body-parser')
//enables cors
app.use(cors({ origin: true }))
const PORT = 8080

require('./models/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to router
app.use(require('./routes/index'))

app.listen(PORT, (req, res) => {
  console.log('Server connected')
})
