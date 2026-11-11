import { useState } from 'react';
import { TextField, Button } from '@mui/material'

const Create = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
      'likes': 0,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new blog:</h2>
      <form onSubmit={handleCreate}>
        <TextField
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
        <br/>
        <TextField
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
        <br/>
        <TextField
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
        <br/>
        <Button type='submit' variant="contained" style={{ marginTop: 10 }}>Create</Button>
      </form>
    </div>
  )}

export default Create