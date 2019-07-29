const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = request.body

  if (!blog.likes) {
    blog.likes = 0
  }

  const blogObject = new Blog(blog)

  try {
    const result = await blogObject.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter