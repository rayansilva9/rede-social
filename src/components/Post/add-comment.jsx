import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/userContext'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { useRef } from 'react'
import useUser from '../../hooks/use-User'
import { ThemeContext } from '../../context/theme'
import { db } from '../../lib/firebase'
import { v4 as uuidv4 } from 'uuid'

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('')
  const inputRef = useRef(null)
  const {
    user: { username, userId }
  } = useUser()

  const docIdPost = uuidv4().slice(0, 14)

  function handleSubmitComment(e) {
    e.preventDefault()

    setComments([...comments, { name: username, comment, userId, docIdPost }])
    setComment('')

    db.collection('photos').doc(docId).collection('comentarios').doc(docIdPost).set({
      comment: comment,
      docId: docIdPost,
      name: username,
      userId: userId
    })
  }
  const { darkMode } = useContext(ThemeContext)

  return (
    <div style={{ background: !darkMode ? 'white' : '' }}>
      <Box
        component="form"
        onSubmit={e => {
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }}
        noValidate
        sx={{
          display: 'flex',
          flex: 1,
          mt: 1,
          bgcolor: !darkMode ? 'white' : 'black',
          width: '100%',
          height: '45px'
        }}
      >
        <input
          className="input_add_comment"
          placeholder="Comentar algo..."
          type="text"
          value={comment}
          onChange={({ target }) => {
            setComment(target.value)
          }}
          onSubmit={handleSubmitComment}
          ref={commentInput}
          style={{
            width: '100%',
            height: '100%',
            background: !darkMode ? 'white' : '#101010',
            color: !darkMode ? 'black' : 'white'
          }}
        />

        <Button
          className="btn_send"
          variant={!darkMode ? '' : 'outlined'}
          sx={{
            color: !darkMode ? 'black' : 'white',
            border: !darkMode ? '1px' : 'unset',
            ':disabled': {
              color: !darkMode ? '' : '#666666'
            }
          }}
          disabled={comment < 1 ? true : false}
        >
          Publicar
        </Button>
      </Box>
    </div>
  )
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired
}
