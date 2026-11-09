const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="username"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm