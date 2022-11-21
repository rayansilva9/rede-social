import { Button, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/userContext'
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
          top: "0",
          display: {xs:'flex', sm:'none',},
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: '50px',
          width: '100vw',
          bgcolor: 'white',
          boxShadow: '0px 2px 9px 0px rgba(0,0,0,0.42)'
        }}
      >
        redesocial
        <input className="input_search_header" placeholder="Procurar" type="text" />
        <Button
          sx={{
            display:{xs:'none', sm:'inline',},
          }}
          variant="contained"
          size="small"
          color="error"
          onClick={() => {
            // firebase.auth().signOut()
          }}
        >
          log out
        </Button>
      </Stack>
    </>
  )
}

export default Header
