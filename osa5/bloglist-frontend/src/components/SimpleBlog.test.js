import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders the title, author and the amount of likes', () => {
  const blog = {
    title: 'paskablogi',
    author: 'Olli',
    likes: 6
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'paskablogi'
  )

  expect(component.container).toHaveTextContent(
    'Olli'
  )

  expect(component.container).toHaveTextContent(
    'blog has 6 likes'
  )

})

test('Eventhandler is called twice when clicking the like-button twice', async () => {
  const blog = {
    title: 'paskablogi',
    author: 'Olli',
    likes: 6
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})