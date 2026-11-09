import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notif, setNotif] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setNotif('Error, wrong credentials.')
      setTimeout(() => {setNotif(null)}, 4000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable openLabel='login' closeLabel='quit'>
        <Notification message={notif}/>
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

  return(
    loginForm()
  )
}

export default Login
