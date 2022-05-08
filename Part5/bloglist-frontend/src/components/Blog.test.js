import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('<Blog />', () => {
  let component
  let testBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 5,
    user: '6262e718d711d78d5a44af0d',
  }

  let mockHandler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })

  beforeEach(() => {
    component = render(<Blog blog={testBlog} handleLike={mockHandler} />)
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).not.toHaveTextContent(testBlog.url)
    expect(component.container).not.toHaveTextContent(testBlog.likes)
  })

  test('shows url and likes after button click', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(testBlog.url)
    expect(component.container).toHaveTextContent(testBlog.likes)
  })

  test('calls event handler twice', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})