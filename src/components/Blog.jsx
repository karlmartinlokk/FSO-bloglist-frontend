import Togglable from "./Togglable"

const Blog = ({ blog, likeBlog }) => {
  return (
  <div style={{ margin: '10px' }}>
    <div>{blog.title}</div>
    <br/>
    <Togglable openLabel='view' closeLabel='hide'>
              <div>{blog.url}</div>
              <div>{blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
              <div>{blog.author}</div>
              <br/>
    </Togglable>
  </div>
)}

export default Blog