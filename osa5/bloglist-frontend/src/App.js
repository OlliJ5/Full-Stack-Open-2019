import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useField } from './hooks'
import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  const [user, setUser] = useState(null)

  const usernameField = useField('text')
  const passwordField = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameField.input.value
      const password = passwordField.input.value
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      props.notificationChange(`Welcome ${username}`, 5)

      usernameField.reset()
      passwordField.reset()
    } catch (exception) {
      props.notificationChange('Wrong username or password', 3)
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
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              {...usernameField.input}
            />
          </div>
          <div>
            password
            <input
              {...passwordField.input}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

    )

  }

  const sortedBlogs = [...props.blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <p>logged in as {user.name}</p>
      <button
        onClick={handleLogout}>
        logout
      </button>
      <h2>Create a new blog</h2>
      <Notification />
      <Togglable buttonLabel="add a blog">
        <BlogForm />
      </Togglable>

      <h2>blogs</h2>

      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} user={user} />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { notificationChange, initializeBlogs })(App)
