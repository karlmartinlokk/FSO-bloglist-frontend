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

test('unauthenticated users see blog info but not like and remove buttons', () => {
  render(<Blog blog={blog} isLoggedIn={false} isAuthor={false}/>)

  const title = screen.getByText('Component testing is done with react-testing-library')
  const author = screen.getByText('by mluukkai')
  const url = screen.getByText('some url')
  const likes = screen.getByText(0)

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()

  const likeButton = screen.queryByRole('button', { name: 'like' })
  const removeButton = screen.queryByRole('button', { name: 'remove' })

  expect(likeButton).toBeNull()
  expect(removeButton).toBeNull()
})

test('authenticated users see blog info and like button but not remove', () => {
  render(<Blog blog={blog} isLoggedIn={true} isAuthor={false}/>)

  const title = screen.getByText('Component testing is done with react-testing-library')
  const author = screen.getByText('by mluukkai')
  const url = screen.getByText('some url')
  const likes = screen.getByText(0)
  const likeButton = screen.getByRole('button', { name: 'like' })

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(likeButton).toBeVisible()

  const removeButton = screen.queryByRole('button', { name: 'remove' })

  expect(removeButton).toBeNull()
})

test('author sees blog info and both like and remove buttons', () => {
  render(<Blog blog={blog} isLoggedIn={true} isAuthor={true}/>)

  const title = screen.getByText('Component testing is done with react-testing-library')
  const author = screen.getByText('by mluukkai')
  const url = screen.getByText('some url')
  const likes = screen.getByText(0)
  const likeButton = screen.getByRole('button', { name: 'like' })
  const removeButton = screen.getByRole('button', { name: 'remove' })

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(likeButton).toBeVisible()
  expect(removeButton).toBeVisible()
})

test('like button handler called twice on clicking button twice', async () => {
  const mockLikeHandler = vi.fn()
  render(<Blog blog={blog} isLoggedIn={true} likeBlog={mockLikeHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')

  // click like twice
  await user.click(button)
  await user.click(button)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)

})