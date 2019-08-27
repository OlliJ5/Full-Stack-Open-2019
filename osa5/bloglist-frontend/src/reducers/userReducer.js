import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  case 'KEEP_LOGIN':
    return action.user
  default:
    return state
  }
}

export const logIn = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const keepUserLoggedIn = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch({
      type: 'KEEP_LOGIN',
      user
    })
  }
}


export default userReducer