import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import Blog from './Blog'

const BlogList = ({ user, blogs, setBlogs}) => {
  const [notif, setNotif] = useState(null)

  const likeBlog = async (blog) => {
    const updatedBlog = await blogService.updateBlog({ ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b)))
  }

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog "${blog.title}"?`)) {
      return
    }

    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setNotif('Blog deleted successfully.')
      setTimeout(() => {setNotif(null)}, 4000)
    } catch {
      setNotif('Error, blog could not be deleted.')
      setTimeout(() => {setNotif(null)}, 4000)
    }
  }

  const blogList = () => {
    const sortedBlogs = [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes) //sort COPY of blogs by likes descending
    return (
      sortedBlogs.map(blog =>
        <div key={blog.id} style={{ padding: '5px', border: 'solid black', marginBottom: '5px' }}>
          <Blog blog={blog} likeBlog={likeBlog}/>
          {blog.user.id === user.id &&
              <div style={{paddingLeft: '10px', paddingBottom: '10px'}}>
                <button onClick={() => removeBlog(blog)}> remove </button>
              </div>
          }
        </div>
      )
    )}
  return(
    <div>
      <Notification message={notif}/>
      <div className='allBlogs'>
        {blogList()}
      </div>
    </div>

  )
}

export default BlogList