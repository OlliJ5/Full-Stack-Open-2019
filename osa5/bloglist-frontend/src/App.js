import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import { Container } from 'semantic-ui-react'
import { initializeBlogs } from './reducers/blogReducer'
import { keepUserLoggedIn } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = (props) => {
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

  const userById = (id) => {
    return props.users.find(user => user.id === id)
  }

  const blogById = (id) => props.blogs.find(blog => blog.id === id)

  if (props.user === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />} />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />} />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { initializeBlogs, keepUserLoggedIn, initializeUsers })(App)
