import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

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
    } catch(exception) {
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
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>

      <h2>blogs</h2>

      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />)}
    </div>
  )
}

export default App
