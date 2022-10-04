const express = require('express')
const route = express.Router()

const Blog = require('../models/Blog')

route.post('/post', (req, res) => {
  if (!title || !des) {
    return res.status(400).json({ error: 'All the fields are required' })
  }

  const blogPost = Blog({
    title,
    des,
  })

  Blog.create(blogPost)
    .then((resData) => {
      res.json({ PostResult: resData, message: 'Post create Succesfully' })
    })
    .catch((err) => {
      console.log(err)
    })
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
})

// the find method is from mongodb
// get all data
route.get('/getdata', (req, res) => {
  Blog.find({})
    .sort({ date: 'DESC' })
    .then((resultData) => {
      res.json(resultData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// delete
route.delete('/delete/:id', (req, res) => {
  var deleteQuery = { _id: req.params.id }

  Blog.findByIdAndUpdate(deleteQuery)
    .then((deleteData) => {
      res.json({ message: 'Post delete sucessfully' })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = route
