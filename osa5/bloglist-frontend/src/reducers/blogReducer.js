import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blogToLike = state.find(blog => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : likedBlog)
  }

  case 'ADD_BLOG':
    return state.concat(action.data)

  case 'REMOVE':{
    const id = action.data.id

    return state.filter(blog => blog.id !== id)
  }

  case 'INIT_BLOGS':
    return action.data

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    const id = updatedBlog.id

    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE',
      data: { id }
    })
  }
}

export default blogReducer