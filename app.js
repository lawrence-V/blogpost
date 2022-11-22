const cors = require('cors')
const express = require('express')
const app = express()
const passport = require('passport')
const multer = require('multer')
// app.use(cors())
const bodyParser = require('body-parser')
//enables cors
app.use(cors())
const PORT = 8000

require('./models/db')
require('./models/User')

// use the passport middleware
app.use(passport.initialize())
// Bring in the passport strategy
require('./config/passport')(passport)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to router
const users = require('./routes/api/users')
const authRouter = require('./routes/authRouter')
const imageUser = require('./routes/user')

app.use('/api/users', users)
app.use(require('./routes/index'))
app.use('/api/auth/', authRouter)
app.use('/api/auth/', imageUser)

// app.use(require('./routes/api/users'))

app.listen(PORT, (req, res) => {
  console.log('Server connected')
})
