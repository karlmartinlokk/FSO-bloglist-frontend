import { useState, useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'

import Blog from './components/Blog'
import Create from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

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

  useEffect(() => {
    if (!user) return

    const expiresAt = jwtDecode(user.token).exp * 1000
    const timer = setTimeout(() => {
      window.localStorage.removeItem('loggedBloglistUser')
      blogService.setToken(null)
      setUser(null)
    }, expiresAt - Date.now() )
    return () => clearTimeout(timer)
  }, [user])

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
        setNotif('Error, wrong credentials.')
        setTimeout(() => {setNotif(null)}, 4000)
      }
    }

    const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
      blogService.setToken(null)
    }

    const loginForm = () => {
      return (
        <Togglable openLabel='login' closeLabel='quit'>
          <LoginForm
            handleLogin = {handleLogin}
            handleUsernameChange = {({ target }) => setUsername(target.value)}
            handlePasswordChange = {({ target }) => setPassword(target.value)}
            username = {username}
            password = {password}
          />
        </Togglable>
      )
    }

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

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notif}/>

      {user === null
      ? loginForm() 
      : (
      <div>
        <h4>Logged in as {user.name}</h4>
        <button onClick={handleLogout}>Logout</button>
        {createBlogForm()}
        <br/>
        {blogList()}
      </div>
      )}

    </div>
  )
}

export default App