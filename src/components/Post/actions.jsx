import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/userContext'
import { Box, Divider, IconButton } from '@mui/material'
import { AiFillHeart } from 'react-icons/ai'
import { BsHeart } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { GoComment } from 'react-icons/go'
import { RiSendPlaneFill } from 'react-icons/ri'
import { FaCommentAlt } from 'react-icons/fa'

export default function PostActions({
  docId,
  totalLikes,
  totalComments,
  likedPhoto,
  handleFocus
}) {
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext)

  const [toggleLiked, setToggleLiked] = useState(likedPhoto)
  const [likes, setlikes] = useState(totalLikes)
  const { firebase, FieldValue } = useContext(FirebaseContext)

  const handleToggleLiked = async () => {
    setToggleLiked(toggleLiked => !toggleLiked)

    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId)
      })

    setlikes(likes => (toggleLiked ? likes - 1 : likes + 1))
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: '',
        justifyContent: 'left',
        gap: '10px',
        m: '5px 10px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          gap: '20px'
        }}
      >
        <Box
          onClick={() => {
            handleToggleLiked(toggleLiked)
          }}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <IconButton
            sx={{
              color: toggleLiked ? 'red' : 'black',
              p: 0,
              transition: '0.2s all linear',
              scale: toggleLiked ? '1.1' : '1.0'
            }}
          >
            <BsHeartFill />
          </IconButton>
          {likes}
        </Box>
        <Box
          onClick={handleFocus}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <IconButton
            sx={{
              p: 0,
              fontSize: '25px'
            }}
          >
            <FaCommentAlt />
          </IconButton>
          {totalComments}
        </Box>
        <Box
          onClick={handleFocus}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <IconButton
            sx={{
              p: 0,
              fontSize: '30px'
            }}
          >
            <RiSendPlaneFill />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}

PostActions.propTypes = {
  docId: PropTypes.string,
  totalLikes: PropTypes.number,
  totalComments: PropTypes.number,
  likedPhoto: PropTypes.bool,
  handleFocus: PropTypes.func
}
