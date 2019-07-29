const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "blogi1",
    author: "joku dude",
    url: "blogi1.fi",
    likes: 10
  },
  {
    title: "blogi2",
    author: "dude2",
    url: "blogi2.fi",
    likes: 3
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body.length).toBe(initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id field is called id instead of _id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const blog = {
    title: "paskablogi",
    author: "olli",
    url: "paskablogi.fi",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)

  const res = await api.get('/api/blogs')
  const titles = res.body.map(blog => blog.title)

  expect(res.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('paskablogi')
})

test('likes are set to 0 if not specified when adding a blog', async () => {
  const blog = {
    title: "paskablogi2",
    author: "olli",
    url: "paskablogi2.fi"
  }

  const res = await api
    .post('/api/blogs')
    .send(blog)

  expect(res.body.likes).toBeDefined()
  expect(res.body.likes).toBe(0)
})

test('a blog without a title cannot be added', async () => {
  const blog = {
    author: "olli",
    url: "paskablogi2.fi",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})

test('a blog without a url cannot be added', async () => {
  const blog = {
    title:"paskablogi",
    author: "olli",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})