import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {props.users.map(user =>
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>{user.blogs.length}
          </li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)