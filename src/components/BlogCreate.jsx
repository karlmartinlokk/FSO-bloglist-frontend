import { useState, useRef } from 'react'
import Create from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'
import blogService from '../services/blogs'

const BlogCreate = ({ blogs, setBlogs }) => {
  const [notif, setNotif] = useState(null)

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotif('Blog created successfully!')
      setTimeout(() => {setNotif(null)}, 4000)
    } catch {
      setNotif('Error, blog could not be created.')
      setTimeout(() => {setNotif(null)}, 4000)
    }

  }

  const createBlogForm = () => {
    return (
      <Togglable openLabel='Create new blog' closeLabel='Cancel' ref={blogFormRef}>
        <Create createBlog={addBlog}/>
      </Togglable>
    )
  }
  return(
    <div>
      <Notification message={notif}/>
      {createBlogForm()}
    </div>

  )
}

export default BlogCreate