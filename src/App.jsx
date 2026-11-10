import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogCreate from './components/BlogCreate'
import Notification from './components/Notification'

import blogService from './services/blogs'

import { jwtDecode } from 'jwt-decode'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState(null)

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

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  const likeBlog = async (blog) => {
    if (!user) navigate('/login')
    const updatedBlog = await blogService.updateBlog({ ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b)))
  }

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog "${blog.title}"?`)) return

    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      navigate('/')
      setNotif('Blog deleted successfully.')
      setTimeout(() => {setNotif(null)}, 4000)
    } catch {
      setNotif('Error, blog could not be deleted.')
      setTimeout(() => {setNotif(null)}, 4000)
    }
  }

  const userIsAuthor = (blog) => {
    if (!user || !blog) return false
    if (blog.user.id === user.id) {
      return true
    } else {
      return false
    }
  }

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
        {user === null
          ? <Link style={padding} to="/login"><div style={{ display: 'inline-flex' }}>login</div></Link>
          : <button onClick={handleLogout}>logout</button>
        }
      </div>

      <Routes>
        <Route path="/" element={
          <div>
            { user !== null &&
                <h4>Logged in as {user.name}</h4>
            }
            <Notification message={notif}/>
            <BlogList blogs={blogs}/>
          </div>
        } />
        <Route path="/blogs/:id" element={
          <Blog
            blog={blog}
            likeBlog={likeBlog}
            isAuthor={userIsAuthor(blog)}
            removeBlog={removeBlog}
            notif={notif}
          />
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