import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { useField } from './hooks'
import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logIn, logOut, keepUserLoggedIn } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = (props) => {
  const usernameField = useField('text')
  const passwordField = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      props.keepUserLoggedIn()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameField.input.value
      const password = passwordField.input.value
      await props.logIn(username, password)
      props.notificationChange(`Welcome ${username}`, 5)

      usernameField.reset()
      passwordField.reset()
    } catch (exception) {
      props.notificationChange('Wrong username or password', 3)
    }
  }

  const handleLogout = () => {
    props.logOut()
  }

  const userById = (id) => {
    return props.users.find(user => user.id === id)
  }

  const blogById = (id) => props.blogs.find(blog => blog.id === id)

  if (props.user === null) {
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

  return (
    <div>
      <p>logged in as {props.user.name}</p>
      <button
        onClick={handleLogout}>
        logout
      </button>
      <Router>
        <div>
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />} />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />} />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { notificationChange, initializeBlogs, logIn, logOut, keepUserLoggedIn, initializeUsers })(App)
