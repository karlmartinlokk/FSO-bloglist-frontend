import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return(
    <form onSubmit={handleLogin} style={{marginTop: '80px'}}>
      <div>
        <TextField
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="username"
        />
      </div>
      <div>
        <TextField
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
      </div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button>
    </form>
  )
}

export default LoginForm