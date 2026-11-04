import { useState, useEffect } from 'react'

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

    const handleBlogCreate = async (blog) => {
      const newBlog = await blogService.createBlog(blog)
      setBlogs(blogs.concat(newBlog))
      return newBlog
    }

    const loginForm = () => {
      return (
        <Togglable buttonLabel='login'>
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

    const createBlogForm = () => {
      return (
        <Togglable buttonLabel='Create new blog'>
          <Create createBlog={handleBlogCreate}/>
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
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        {createBlogForm()}
        <br/>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
      )}

    </div>
  )
}

export default App