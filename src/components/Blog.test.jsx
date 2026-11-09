import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'mluukkai',
  url: 'some url',
  likes: 0,
  user: '6ae2241983242283574249f3'
}

test('initially render only title and author', () => {
  render(<Blog blog={blog}/>)

  const title = screen.getByText('Component testing is done with react-testing-library')
  const author = screen.getByText('by mluukkai')

  expect(title).toBeVisible()
  expect(author).toBeVisible()

  const url = screen.getByText('some url')
  const likes = screen.getByText(0)

  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()

})

test('show url and likes on button click', async () => {
  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('some url')
  const likes = screen.getByText(0)

  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})

test('like button handler called twice on clicking button twice', async () => {
  const mockLikeHandler = vi.fn()
  render(<Blog blog={blog} likeBlog={mockLikeHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')

  // click like twice
  await user.click(button)
  await user.click(button)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)

})