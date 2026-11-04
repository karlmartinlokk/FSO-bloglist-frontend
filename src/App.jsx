import { useState, useEffect, useRef } from 'react'

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

    const blogList = () => {
      return (
        blogs.map(blog =>
          <div key={blog.id} style={{ display: 'flex', padding: '5px', border: 'solid black', marginBottom: '5px' }}>
            <Blog blog={blog} likeBlog={likeBlog}/>
          </div>
        )
    )}
    
    const blogFormRef = useRef()

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const newBlog = await blogService.createBlog(blogObject)
        setBlogs(blogs.concat(newBlog))
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