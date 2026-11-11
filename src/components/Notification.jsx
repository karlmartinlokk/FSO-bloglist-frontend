import { Alert } from '@mui/material'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={message.type}>
      <h3>{message.text}</h3>
    </Alert>

  )
}

export default Notification