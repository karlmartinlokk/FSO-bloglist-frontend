import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const blogList = () => {
    const sortedBlogs = [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes) //sort COPY of blogs by likes descending
    return (
      sortedBlogs.map(blog =>
        <div key={blog.id} style={{ padding: '5px', border: 'solid black', marginBottom: '5px' }}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )
    )}
  return(
    <div>
      <div className='allBlogs'>
        {blogList()}
      </div>
    </div>

  )
}

export default BlogList