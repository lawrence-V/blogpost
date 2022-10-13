const express = require('express')
const route = express.Router()

const Blog = require('../models/Blog')

route.post('/post', (req, res) => {
  const { title, des } = req.body

  if (!title || !des) {
    return res.status(400).json({ error: 'All the fields are required' })
  }

  const blogPost = Blog({
    title,
    des,
    // first_name,
    // middle_name,
    // last_name,
    // age,
  })

  Blog.create(blogPost)
    .then((resData) => {
      res.json({ PostResult: resData, message: 'Post create Succesfully' })
    })
    .catch((err) => {
      console.log(err)
    })
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

  Blog.findByIdAndDelete(deleteQuery)
    .then((deleteData) => {
      res.json({ message: 'Post delete sucessfully' })
    })
    .catch((err) => {
      console.log(err)
    })
})

// edit api

route.get('/edit/:id', (req, res) => {
  var editQuery = { _id: req.params.id }
  Blog.findOne(editQuery)
    .then((editData) => {
      res.json(editData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// Details post api

route.get('/details/:id', (req, res) => {
  var detailsQuery = { _id: req.params.id }
  Blog.findOne(detailsQuery)
    .then((detailsdata) => {
      res.json(detailsdata)
    })
    .catch((err) => {
      console.log(err)
    })
})

// update edit data api

route.put('/update/:id', (req, res) => {
  var updateQuery = { _id: req.params.id }
  Blog.updateOne(updateQuery, {
    $set: {
      title: req.body.title,
      des: req.body.des,
    },
  })
    .then((updatedata) => {
      res.json(updatedata)
    })
    .catch((err) => {
      console.log(err)
    })
})

//latest post api endpoint

route.get('/latestpost', (req, res) => {
  Blog.find({})
    .sort({ date: 'desc' })
    .limit(5)
    .then((latestpost) => {
      res.json(latestpost)
    })
    .catch((err) => {
      console.log(err)
    })
})
module.exports = route
