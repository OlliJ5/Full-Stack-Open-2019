import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [fullyVisible, setFullyVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (fullyVisible === false) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setFullyVisible(true)}>
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
        <p>likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
        <p>Added by {blog.user.username}</p>
        {blog.user.username === user.username && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog