import Togglable from "./Togglable"
import Notification from "./Notification"

const Blog = ({ blog, likeBlog, isAuthor, isLoggedIn, removeBlog, notif }) => {
  if (!blog) return null
  return (
    <>
      <Notification message={notif}/>
      <div className='blog' style={{ padding: '5px', border: 'solid black', marginBottom: '5px' }}>
        <div style={{display: 'flex'}}>
          <h3 style={{margin: 0, marginRight: '5px'}}>
            {blog.title}
          </h3>
          <div style={{marginTop: '3px'}}>
            by {blog.author}
          </div>
        </div>
        <br/>

        <div>{blog.url}</div>
        <div>
          <span className="likeCount">{blog.likes}</span>
          { isLoggedIn &&
              <button onClick={() => likeBlog(blog)}>like</button>
          }
        </div>
        <div>{blog.user.name}</div>
        <br/>
        { isAuthor === true &&
                <div style={{paddingBottom: '10px', paddingTop: '5px'}}>
                  <button onClick={() => removeBlog(blog)}>remove</button>
                </div>
        }
      </div>
    </>
  )}

export default Blog