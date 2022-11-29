import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/userContext'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { useRef } from 'react'
import useUser from '../../hooks/use-User'
// import { FieldValue } from '../../lib/firebase'

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('')
  const inputRef = useRef(null)
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const {
    user: { username, userId }
  } = useUser()

  function handleSubmitComment(e) {
    e.preventDefault()

    setComments([...comments, { username, comment }]);
    setComment('')

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ username, comment })
      })
  }

  return (
    <>
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
          bgcolor: 'white',
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
            background: 'white'
          }}
        />
        <Button disabled={comment < 1 ? true : false}>Publicar</Button>
      </Box>
    </>
  )
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired
}
