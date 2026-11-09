import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogCreate from './components/BlogCreate'
import blogService from './services/blogs'

import { jwtDecode } from 'jwt-decode'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const navigate = useNavigate()

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
    navigate('/')
  }

  const padding = {
    padding: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/create">new blog</Link>
        <Link style={padding} to="/login">
          {user === null
            ? <div style={{ display: 'inline-flex' }}>login</div>
            : <button onClick={handleLogout}>logout</button>
          }
        </Link>
      </div>

      <Routes>
        <Route path="/" element={
          user === null
            ? <Login setUser={setUser}/>
            : <div>
              <h4>Logged in as {user.name}</h4>
              <BlogList user={user} blogs={blogs} setBlogs={setBlogs}/>
            </div>
        } />
        <Route path="/create" element={
          user === null
            ? <Login setUser={setUser}/>
            : <div>
              <h4>Logged in as {user.name}</h4>
              <BlogCreate blogs={blogs} setBlogs={setBlogs}/>
            </div>
        } />
        <Route path="/login" element={
          <Login setUser={setUser}/>
        } />
      </Routes>
    </>
  )
}

export default App