import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, the login form is rendered and no blogs are rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const login = component.getByText('login')
    expect(login).toBeDefined()

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(0)

  })

  test('When a user is logged in, the blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(3)
  })
})