import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logOut()
  }

  return (
    <div>
      <Link style={{ padding: 5 }} to="/">Blogs</Link>
      <Link style={{ padding: 5 }} to="/users">Users</Link>
      logged in as {props.user.name}
      <button
        onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logOut })(Navigation)