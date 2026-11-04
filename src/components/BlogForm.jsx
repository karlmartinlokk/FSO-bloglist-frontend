import { useState } from 'react';

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
        <label>
          title
          <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br/>
        <label>
          author
          <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br/>
        <label>
          url
          <input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br/>
        <button type='submit'>Create</button>
      </form>
    </div>
)}

export default Create