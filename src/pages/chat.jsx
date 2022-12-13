import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useMemo, useContext, useState, useRef } from 'react'
import UserChat from '../components/Chat/user'
import { firebase, FieldValue, storage, database } from '../lib/firebase'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { FaTelegramPlane } from 'react-icons/fa'
import isOnChat from '../context/isOnChat'
import useUser from '../hooks/use-User'
import { v4 as uuidv4 } from 'uuid'

import { useEffect } from 'react'

const ChatPage = () => {
  const [value, setValue] = useState('')
  const [currentUser, setCurrentUser] = useState([])
  const [currentMsn, setCurrentMsn] = useState([])
  const [messages, setMessages] = useState([])
  const { onChat, setOnChat } = useContext(isOnChat)
  const inputRef = useRef(null)
  //[{ username: '', message: '' }]
  const {
    user: { username, userId }
  } = useUser()

  // `${userId}&&${currentMsn.userId}`


  const [open, setOpen] = useState(false)

  const openChat = () => {
    setOpen(true)
    dataRef
      .get()
      .then(snapshot => {})
      .then(snapshot => {
        console.log(snapshot.val())
      })
  }

  const closeChat = () => {
    setOpen(false)

  }
  useMemo(() => {
    async function QueryUser() {
      const result = await firebase
        .firestore()
        .collection('users')
        .where('following', 'array-contains-any', ['HedAth8L3MbNDJU4MK3srPBnp952'])
        .get()

      const users = result.docs.map(e => e.data())
      setCurrentUser(users)
    }
    QueryUser()
  }, [])

  return (
    <Stack sx={{ minHeight: '100vh', width: { xs: '100vw', sm: '400px' }, pt: '10px ' }}>
      <Stack
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          zIndex: 10,
          bottom: !open ? '-100%' : 0,
          backdropFilter: 'blur(19px) saturate(200%)',
          backgroundColor: 'rgba(108, 108, 108, 0.27)',
          transition: 'all .2s linear',
          pb: '10px'
        }}
      >
        {!currentMsn ? null : (
          <>
            <Stack
              spacing="2rem"
              direction="row"
              alignItems="center"
              sx={{ width: '100%', p: '1rem 1rem', bgcolor: 'white' }}
            >
              <MdOutlineArrowBackIos
                onClick={() => {
                  closeChat(), setOnChat(false)
                }}
              />
              <Avatar sx={{ width: '3.4rem', height: '3.4rem' }} src={currentMsn.photo} />
              <Typography fontWeight="bold" fontSize="1.2rem">
                {currentMsn.username}
              </Typography>
            </Stack>
            <Stack sx={{ flex: 1 }}>
              {/* {!messages
                ? null
                : messages.map(e => (
                    <Stack key={uuidv4()} sx={{ bgcolor: 'red' }}>
                      <Typography>
                        {e && e.username} <Typography>{e && e.message}</Typography>
                      </Typography>
                    </Stack>
                  ))} */}
            </Stack>
            <Stack>
              <Box
                component="form"
                onSubmit={enviar}
                noValidate
                sx={{ width: '100%', height: '55px', display: 'flex' }}
              >
                <Box sx={{ p: '2px 5px', flex: 1 }}>
                  <input
                    placeholder="Digite algo..."
                    ref={inputRef}
                    type="text"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '15px',
                      border: 'none',
                      fontSize: '1.1rem',
                      padding: '0 0.5rem',
                      outline: 'none'
                    }}
                  />
                </Box>
                <IconButton
                  type="submit"
                  style={{
                    width: '60px',
                    height: '89%',
                    background: '#007515',
                    color: 'white',
                    lineHeight: '30px',
                    fontSize: '30px',
                    borderRadius: '10px',
                    alignSelf: 'center'
                  }}
                >
                  {<FaTelegramPlane />}
                </IconButton>
              </Box>
            </Stack>
          </>
        )}
      </Stack>
      {currentUser &&
        currentUser.map(user => (
          <Box
            key={uuidv4()}
            onClick={() => {
              openChat(), setCurrentMsn(user), setOnChat(true)
            }}
          >
            <UserChat photo={user.photo} username={user.username} />
          </Box>
        ))}
    </Stack>
  )
}

export default ChatPage
// <form onSubmit={enviar}>
//   <button type="submit">enviar</button>
//   <input
//     value={value}
//     type="text"
//     onChange={({ target }) => setValue(target.value)}
//   />
// </form>
