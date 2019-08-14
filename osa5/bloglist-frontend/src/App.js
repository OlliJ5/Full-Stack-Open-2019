import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(res => {
        setBlogs(res)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage(`A new blog '${title}' by '${author}' added`)
      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Welcome ${username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Please login to the application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

    )

  }

  return (
    <div>
      <p>logged in as {user.name}</p>
      <button
        onClick={handleLogout}>
        logout
      </button>
      <h2>Create a new blog</h2>
      <Notification message={message} />
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      <h2>blogs</h2>

      {blogs.map(blog => <p key={blog.id}>{blog.title} by {blog.author}</p>)}
    </div>
  )
}

export default App
