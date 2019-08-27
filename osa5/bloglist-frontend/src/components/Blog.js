import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [fullyVisible, setFullyVisible] = useState(false)

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (fullyVisible === false) {
    return (
      <div style={blogStyle} className='blog'>
        <div className='clickable' onClick={() => setFullyVisible(true)}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setFullyVisible(false)}>
        <p>Title: {blog.title}</p>
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



export default connect(null, { likeBlog, deleteBlog })(Blog)