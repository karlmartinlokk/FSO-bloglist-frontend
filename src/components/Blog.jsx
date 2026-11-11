import Togglable from "./Togglable"
import Notification from "./Notification"
import { Card, CardContent, Button } from '@mui/material'

const Blog = ({ blog, likeBlog, isAuthor, isLoggedIn, removeBlog, notif }) => {
  if (!blog) return null
  return (
    <>
      <Notification message={notif}/>
      <Card className='blog' style={{marginTop: '80px'}}>
        <CardContent style={{display: 'flex'}}>
          <h3 style={{margin: 0, marginRight: '15px'}}>
            {blog.title}
          </h3>
          <div style={{marginTop: '3px', color:'gray'}}>
            by {blog.author}
          </div>
        </CardContent>
        <CardContent style={{paddingTop: '0'}}>
          <p>{blog.url}</p>
          <p className="likeCount">{blog.likes}</p>
          <p>{blog.user.name}</p>
        </CardContent>
        <CardContent>
          { isLoggedIn &&
              <Button color="primary" onClick={() => likeBlog(blog)}>like</Button>
          }

          { isAuthor === true &&
                  <div style={{paddingBottom: '10px', paddingTop: '5px'}}>
                    <Button color="error" onClick={() => removeBlog(blog)}>remove</Button>
                  </div>
          }
        </CardContent>
      </Card>
    </>
  )}

export default Blog