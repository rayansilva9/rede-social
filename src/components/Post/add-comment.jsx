import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/userContext'
import { Box } from '@mui/system'

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const {
    user: { displayName }
  } = useContext(UserContext)

  function handleSubmitComment(e) {
    e.preventDefault()
    
    setComment([{ displayName, comment }, ...comments])
    setComment('')
    
    console.log(comment)
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
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
        sx={{ mt: 1 }}
      >
        <input className='input_add_comment'
          placeholder='Comentar algo...'
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
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
