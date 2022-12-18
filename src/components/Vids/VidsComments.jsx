import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import FirebaseContext from '../../context/firebase'

const VidsCommentarios = ({ comme, userId2, delet, theme, closeItem }) => {
  // const [closeItem, setOpen] = useState(close)

  const [commentInfoUser, setCommentInfoUser] = useState([])
  const { photo, username, checked } = commentInfoUser

  const { firebase } = useContext(FirebaseContext)

  useMemo(() => {
    async function getUserProviderInfo() {
      const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId2)
        .get()

      const [userProviderInfo] = result.docs.map(doc => ({
        username: doc.data().username,
        photo: doc.data().photo,
        checked: doc.data().checked
      }))

      setCommentInfoUser(userProviderInfo)
    }
    getUserProviderInfo()
  }, [])

  return (
    <Stack
      position="relative"
      width="100%"
      alignItems="flex-start"
      spacing=".6rem"
      color="white"
      direction="row"
      mb=".5rem"
      mt=".5rem"
    >
      <Avatar src={photo} sx={{ width: '30px', height: '30px' }} />
      <Typography
        width="100%"
        fontSize="15px"
        fontWeight="bold"
        color={!theme ? 'black' : 'white'}
      >
        {username}
        <MdVerified
          style={{
            display: checked === true ? 'inline' : 'none',
            fontSize: '.9rem',
            position: 'relative',
            top: '2px',
            left: '2px',
            marginRight: '7px'
          }}
          color="#017cff"
        />
        <span
          style={{
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            fontSize: '13px',
            fontWeight: '400',
            marginLeft: checked ? '0' : '.4rem'
          }}
        >
          {comme}
        </span>
      </Typography>
      <BsThreeDots
        color={!theme ? 'black' : 'white'}
        onClick={() => {
          closeItem = true
        }}
        style={{ marginRight: '5px', marginTop: '5px', fontSize: '20px' }}
      />
      {closeItem && (
        <Box
          sx={{
            width: '80%',
            height: '40px',
            position: 'absolute',
            zIndex: 3,
            right: 0,
            top: 0,
            borderRadius: '20px'
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing="1.3rem"
            justifyContent="flex-end"
            sx={{
              bgcolor: !theme ? '#a2a2a27e' : '#fffefe39',
              backdropFilter: 'blur(5px)',
              height: '40px',
              width: 'auto',
              borderRadius: '10px',
              p: '0 1rem',
              svg: { fontSize: '24px' }
            }}
          >
            <FaTrash onClick={delet} color="#ff3636" fontSize="inherit" />
            <AiFillCloseCircle
              onClick={() => {
                closeItem = false
              }}
              color="red"
              fontSize="inherit"
            />
          </Stack>
        </Box>
      )}
    </Stack>
  )
}

export default VidsCommentarios
