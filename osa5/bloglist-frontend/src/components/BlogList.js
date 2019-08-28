import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = (props) => {

  const sortedBlogs = [...props.blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Create a new blog</h2>
      <Notification />
      <Togglable buttonLabel="add a blog">
        <BlogForm />
      </Togglable>

      <h2>Blogs</h2>
      <div>
        <Table striped celled>
          <Table.Body>
            {sortedBlogs.map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                  </Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogList)