import Togglable from "./Togglable"

const Blog = ({ blog, likeBlog }) => {
  return (
  <div className='blog' style={{ margin: '10px' }}>
    <div style={{display: 'flex'}}>
      <h3 style={{margin: 0, marginRight: '5px'}}>
        {blog.title}
      </h3>
      <div style={{marginTop: '3px'}}>
        by {blog.author}
      </div>
    </div>
    <br/>

    <Togglable openLabel='view' closeLabel='hide'>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
      <div>{blog.user.name}</div>
      <br/>
    </Togglable>

  </div>
)}

export default Blog