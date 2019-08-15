import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Initially blog shows only the title and the author', () => {
  const blog = {
    title: 'paskablogi',
    author: 'Olli',
    likes: 6,
    url: 'www.veryfineblog.fi',
    user: {
      username: 'ollij',
      name: 'olli'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'paskablogi'
  )

  expect(component.container).toHaveTextContent(
    'Olli'
  )

  expect(component.container).not.toHaveTextContent('www.veryfineblog.fi')

})

test('After clicking the blog, all info is shown', () => {
  const blog = {
    title: 'paskablogi',
    author: 'Olli',
    likes: 6,
    url: 'www.veryfineblog.fi',
    user: {
      username: 'ollij',
      name: 'olli'
    }
  }

  const user = {
    username: 'ollij',
    name: 'olli'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const clickableDiv = component.container.querySelector('.clickable')
  fireEvent.click(clickableDiv)

  expect(component.container).toHaveTextContent(
    'Title: paskablogi'
  )
  expect(component.container).toHaveTextContent(
    'Author: Olli'
  )
  expect(component.container).toHaveTextContent(
    'Url: www.veryfineblog.fi'
  )
  expect(component.container).toHaveTextContent(
    'likes: 6 like'
  )
  expect(component.container).toHaveTextContent(
    'Added by ollij'
  )
  expect(component.container).toHaveTextContent(
    'remove'
  )

})