import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const likeABlog = async (blog) => {
    const blogObject = { ...blog, likes: blog.likes + 1, user: blog.user.id ? blog.user.id : blog.user }

    try {
      likeBlog(blogObject)
    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        deleteBlog(blog)
      }
    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  if (!blog) {
    return (
      null
    )
  }

  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        <p>Author: {blog.author}</p>
        <p>Url: <a href={blog.url}>{blog.url}</a></p>
        <p>likes: {blog.likes} <button onClick={() => likeABlog(blog)}>like</button></p>
        <p>Added by {blog.user.username}</p>
        {blog.user.username === user.username && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { likeBlog, deleteBlog })(Blog)