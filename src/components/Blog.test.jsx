import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('initially render only title and author', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'mluukkai',
        url: 'some url',
        likes: 0,
        user: '6ae2241983242283574249f3'
    }

    render(<Blog blog={blog}/>)

    const title =  screen.getByText('Component testing is done with react-testing-library')
    const author =  screen.getByText('by mluukkai')

    expect(title).toBeVisible()
    expect(author).toBeVisible()

    const url = screen.getByText('some url')
    const likes = screen.getByText(0)

    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()

})