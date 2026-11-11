import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes) //sort COPY of blogs by likes descending
  return(
    <TableContainer component={Paper} style={{marginTop: '40px'}}>
      <Table>
        <TableBody>
          {sortedBlogs.map(blog => (
            <TableRow key={blog.id} className='blog'>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>
                {blog.user.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList