import Create from './BlogForm'
import blogService from '../services/blogs'

const BlogCreate = ({ blogs, setBlogs, setNotif, navigate }) => {

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(newBlog))
      navigate('/')
      setNotif('Blog created successfully!')
      setTimeout(() => {setNotif(null)}, 4000)
    } catch {
      setNotif('Error, blog could not be created.')
      setTimeout(() => {setNotif(null)}, 4000)
    }

  }

  return(
    <div>
      <Create createBlog={addBlog}/>
    </div>

  )
}

export default BlogCreate