import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Create from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

    const handleLogin = async event => {
      event.preventDefault()
      try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch {
        setNotif('wrong credentials')

        setTimeout(() => {
            setNotif(null)
        }, 4000)
      }
    }

    const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
      blogService.setToken(null)
    }

    const handleBlogCreate = async (blog) => {
      const newBlog = await blogService.createBlog(blog)
      setBlogs(blogs.concat(newBlog))
      return newBlog
    }

    const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notif}/>

      {user === null
      ? loginForm() 
      : (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>

        <Create createBlog={handleBlogCreate}/>

        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
      )}

    </div>
  )
}

export default App