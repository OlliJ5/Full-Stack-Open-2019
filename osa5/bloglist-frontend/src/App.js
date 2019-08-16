import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const usernameField = useField('text')
  const passwordField = useField('password')

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
    const title = titleField.value
    const author = authorField.value
    const url = urlField.value
    const blogObject = {
      title,
      author,
      url
    }
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage(`A new blog '${title}' by '${author}' added`)
      titleField.reset()
      authorField.reset()
      urlField.reset()

      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  const likeBlog = async (blog) => {
    const user = blog.user
    const blogObject = { ...blog, likes: blog.likes + 1, user: blog.user.id ? blog.user.id : blog.user }

    try {
      const newBlog = await blogService.update(blog.id, blogObject)
      newBlog.user = user
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : newBlog))
    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  const removeBlog = async (blog) => {
    console.log('klikattu')
    try {
      const id = blog.id
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameField.value
      const password = passwordField.value
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

      usernameField.reset()
      passwordField.reset()
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
              {...usernameField}
            />
          </div>
          <div>
            password
            <input
              {...passwordField}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

    )

  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <p>logged in as {user.name}</p>
      <button
        onClick={handleLogout}>
        logout
      </button>
      <h2>Create a new blog</h2>
      <Notification message={message} />
      <Togglable buttonLabel="add a blog">
        <BlogForm addBlog={addBlog}
          titleField={titleField}
          authorField={authorField}
          urlField={urlField}
        />
      </Togglable>

      <h2>blogs</h2>

      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />)}
    </div>
  )
}

export default App
