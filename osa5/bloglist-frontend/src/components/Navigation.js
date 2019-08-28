import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logOut()
  }

  return (
    <div>
      <Menu inverted>
        <Menu.Item link>
          <Link style={{ padding: 5 }} to="/">Blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link style={{ padding: 5 }} to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item>
          <div style={{ paddingRight: 10 }}>logged in as {props.user.name}</div>
          <Button
            onClick={handleLogout}>
            logout
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logOut })(Navigation)