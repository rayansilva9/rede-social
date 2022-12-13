import PropTypes from 'prop-types'
import { useContext, useMemo, useState } from 'react'
import { formatDistance } from 'date-fns'
import AddComment from './add-comment'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { ThemeContext } from '../../context/theme'
import { deleteComment } from '../../services/firebase'
import Commentarios from './commentarios'

export default function PostComments({ docId, comments, posted, commentInput }) {
  const [open, setOpen] = useState(1)
  const [comentarios, setComments] = useState([])
  const docPostId = docId

  useMemo(() => {
    setComments(comments)
  }, [comments])

  const handleDeleteComment = (index, CommentdocId) => {
    const newComments = [...comentarios]
    newComments.splice(index, 1)
    setComments(newComments)
    deleteComment(docPostId, CommentdocId)
  }

  const { darkMode } = useContext(ThemeContext)

  return (
    <div style={{ padding: '0 2px', transition: 'all .3s' }}>
      <Box
        sx={{
          display: comentarios ? 'block' : 'none',
          overflowX: 'scroll',
          bgcolor: !darkMode ? '#bdbcbc4e' : '#101010',
          borderRadius: '10px',
          transition: 'all 0.3s linear',
          maxHeight: '400px',
          '&::-webkit-scrollbar': {
            display: open > 1 ? 'inline' : 'none',
            width: '5px',
            bgcolor: '#c1c1c161'
          },
          '&::-webkit-scrollbar-button': {
            display: 'none'
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#9090909d',
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar-track-piece': {
            bgcolor: '#c1c1c161',
            borderRadius: '10px'
          }
        }}
      >
        {comentarios.slice(0, open).map((item, index) => {
          return (
            <Commentarios
              key={item.docId}
              comme={item.comment}
              userId2={item.userId}
              docId={item.docId}
              delet={() => {
                handleDeleteComment(index, item.docId)
              }}
              theme={darkMode}
            />
          )
        })}
      </Box>
      {comentarios.length >= 2 && (
        <Typography
          m="5px 0"
          fontSize={13}
          color={!darkMode ? '#939292' : '#abaaaa'}
          onClick={() => {
            open <= 1 ? setOpen(comentarios.length) : setOpen(1)
          }}
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            ml: '3px'
          }}
        >
          {open <= 1 ? `Ver todos os ${comentarios.length} comentarios` : 'Ver menos'}
        </Typography>
      )}

      <AddComment
        docId={docId}
        comments={comentarios}
        setComments={setComments}
        commentInput={commentInput}
      />
      <Typography
        sx={{ m: '10px' }}
        color={!darkMode ? '#939292' : 'white'}
        fontSize="10px"
      >
        {formatDistance(posted, new Date())} ago
      </Typography>
    </div>
  )
}

PostComments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
}
