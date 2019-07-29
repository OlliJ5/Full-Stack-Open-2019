const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'ogrousu',
    password: 'salainen'
  }
]

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User(initialUsers[0])
    await user.save()
  })

  test('a valid user can be added', async () => {
    const newUser = {
      username: 'ollij',
      name: 'Olli',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/users')
    const usernames = res.body.map(u => u.username)

    expect(res.body.length).toBe(initialUsers.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test('user cannot be added without a username', async () => {
    const newUser = {
      name: 'Olli',
      password: 'salainen',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(res.body.error).toContain('`username` is required')
  })

  test('username must be unique', async () => {
    const newUser = {
      username: 'ogrousu',
      name: 'Olli',
      password: 'salainen',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(res.body.error).toContain('expected `username` to be unique')
  })

  test('username must be at least 3 characters long', async() => {
    const newUser = {
      username: 'oj',
      name: 'Olli',
      password: 'salainen',
    }

    const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(res.body.error).toContain('is shorter than the minimum allowed length (3)')    
  })

  test('password must be at least 3 characters long', async () => {
    const newUser = {
      username: 'ollij',
      name: 'Olli',
      password: 'ei',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(res.body.error).toBe('password must be at least 3 characters')
  })

  test('user cannot be added without a password', async () => {
    const newUser = {
      username: 'ollij',
      name: 'Olli',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(res.body.error).toContain('password missing')
  })
})

afterAll(() => {
  mongoose.connection.close()
})