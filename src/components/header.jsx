import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/userContext'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import useUser from '../hooks/use-User'

const Header = () => {
  const { user } = useContext(UserContext)
  const { firebase } = useContext(FirebaseContext)

  return (
    <>
      <Stack
        sx={{
          position: 'fixed',
          zIndex: 99,
          top: '0',
          mt: '1px',
          p:'0 10px',
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '50px',
          width: '100vw',
          bgcolor: '#cdd3d98e',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px'
          // boxShadow: '0px 2px 9px 0px rgba(0,0,0,0.42)'
        }}
      >
        <IconButton aria-label="delete">
          <AiOutlineSetting />
        </IconButton>
        <Typography>Desgram-a</Typography>
        <IconButton aria-label="delete">
          <HiOutlineMail />
        </IconButton>
      </Stack>
    </>
  )
}

export default Header
