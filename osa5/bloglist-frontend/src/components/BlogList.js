import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = (props) => {

  const sortedBlogs = [...props.blogs].sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Notification />
      <Togglable buttonLabel="add a blog">
        <BlogForm />
      </Togglable>

      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <div key={blog.id} style={blogStyle} className='blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogList)