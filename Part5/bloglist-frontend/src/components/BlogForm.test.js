import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  const createBlog = jest.fn()
  let component = render(<BlogForm createBlog={createBlog} />)

  test('renders title and author', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'testTitle' } })
    fireEvent.change(author, { target: { value: 'testAuthor' } })
    fireEvent.change(url, { target: { value: 'testUrl' } })
    fireEvent.change(likes, { target: { value: '5' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
    expect(createBlog.mock.calls[0][0].url).toBe('testUrl')
    expect(createBlog.mock.calls[0][0].likes).toBe(5)
  })
})