import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogCreate from './components/BlogCreate'
import blogService from './services/blogs'

import { jwtDecode } from 'jwt-decode'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <h1>Bloglist</h1>
      {user === null
        ? <Login setUser={setUser}/>
        : (
          <div>
            <h4>Logged in as {user.name}</h4>
            <button onClick={handleLogout}>Logout</button>
            <br/>
            <BlogCreate blogs={blogs} setBlogs={setBlogs}/>
            <BlogList user={user} blogs={blogs} setBlogs={setBlogs}/>
          </div>
        )}

    </div>
  )
}

export default App