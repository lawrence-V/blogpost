const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/NUXTBLOGAPP',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log('Databse connected')
    } else {
      console.log('Error' + err)
    }
  }
)
