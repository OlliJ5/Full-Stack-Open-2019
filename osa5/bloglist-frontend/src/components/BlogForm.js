import React from 'react'
import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = (props) => {
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    const title = titleField.input.value
    const author = authorField.input.value
    const url = urlField.input.value
    const blogObject = {
      title,
      author,
      url
    }
    try {
      props.createBlog(blogObject)
      props.notificationChange(`A new blog '${title}' by '${author}' added`, 5)
      titleField.reset()
      authorField.reset()
      urlField.reset()

    } catch (exception) {
      console.log('error occured', exception)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          {...titleField.input}
        />
      </div>
      <div>
        author
        <input
          {...authorField.input}
        />
      </div>
      <div>
        url
        <input
          {...urlField.input}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}


export default connect(null, { notificationChange, createBlog })(BlogForm)