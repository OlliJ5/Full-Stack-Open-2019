import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, titleField, authorField, urlField }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          {...titleField}
        />
      </div>
      <div>
        author
        <input
          {...authorField}
        />
      </div>
      <div>
        url
        <input
          {...urlField}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}


export default BlogForm