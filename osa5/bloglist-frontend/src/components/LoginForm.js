import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'
import { useField } from '../hooks'
import { logIn } from '../reducers/loginReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const usernameField = useField('text')
  const passwordField = useField('password')

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      const username = usernameField.input.value
      const password = passwordField.input.value
      props.logIn(username, password)
      props.notificationChange(`Welcome ${username}`, 5)

      usernameField.reset()
      passwordField.reset()
    } catch (exception) {
      props.notificationChange('Wrong username or password', 3)
    }
  }

  return (
    <div>
      <h2>Please login to the application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input
            {...usernameField.input}
          />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input
            {...passwordField.input}
          />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

export default connect(null, { logIn, notificationChange })(LoginForm)