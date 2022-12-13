import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/userContext'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import { AiFillHeart } from 'react-icons/ai'
import { BsHeart } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { GoComment } from 'react-icons/go'
import { RiSendPlaneFill } from 'react-icons/ri'
import { FaCommentAlt } from 'react-icons/fa'
import { ThemeContext } from '../../context/theme'
import { useMemo } from 'react'

export default function PostActions({
  docId,
  totalLikes,
  totalComments,
  likedPhoto,
  handleFocus,
  contatador
}) {
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext)

  const [toggleLiked, setToggleLiked] = useState(likedPhoto)
  const [likes, setlikes] = useState(totalLikes)
  const { firebase, FieldValue } = useContext(FirebaseContext)

  // useMemo(() => {
  //   setTimeout(() => {
  //     setlikes(totalLikes)
  //     setToggleLiked(likedPhoto)
  //   }, 250)
  // }, [likedPhoto, totalLikes])

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

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: '',
        justifyContent: 'left',
        m: '5px 10px',
        fontFamily: "'Comfortaa', cursive"
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          gap: '20px'

          // bgcolor:'white',
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
            className="fromDarkTheme"
            sx={{
              display: !darkMode ? 'none' : 'flex',
              color: toggleLiked ? 'red' : 'grey',
              p: 0,
              transition: '0.2s all linear',
              scale: toggleLiked ? '1.1' : '.0'
            }}
          >
            <BsHeartFill />
          </IconButton>
          <IconButton
            className="fromLightTheme"
            sx={{
              display: !darkMode ? 'flex' : 'none',
              color: toggleLiked ? 'red' : 'black',
              p: '0',
              transition: '.1s all linear',
              fontSize: '1.4rem'
            }}
          >
            <BsHeartFill />
          </IconButton>
          <p style={{ color: !darkMode ? 'black' : 'white' }}>{likes}</p>
        </Box>
        <Box
          onClick={handleFocus}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center'
            // color: !darkMode ? 'black' : 'white'
          }}
        >
          <IconButton
            sx={{
              p: 0,
              fontSize: '1.4rem',
              color: !darkMode ? 'black' : 'grey'
            }}
          >
            <FaCommentAlt />
          </IconButton>
          <Typography color={!darkMode ? 'black' : 'white'} variant="p">
            {totalComments}
          </Typography>
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
              fontSize: '1.6rem',
              color: !darkMode ? 'black' : 'grey'
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
