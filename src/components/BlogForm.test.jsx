import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Create from './BlogForm'

test('<Create/> calls handler with correct details', async () => {
  const mockCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(<Create createBlog={mockCreateBlog}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'testing title')
  await user.type(authorInput, 'testing author')
  await user.type(urlInput, 'testing url')

  await user.click(createButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)

  expect(mockCreateBlog.mock.calls[0][0].title).toBe('testing title')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('testing author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('testing url')

})