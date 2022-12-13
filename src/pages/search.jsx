import { Avatar, Input, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import UserSearchPage from '../components/userSearchPage'
import { ThemeContext } from '../context/theme'
import { getUserSearch } from '../services/firebase'

const SearcPage = () => {
  const [user, setUser] = useState()
  const [query, setQuery] = useState('')

  // let latitude
  // let longitude
  // navigator.geolocation.getCurrentPosition(function (position) {
  //   latitude = position.coords.latitude
  //   longitude = position.coords.longitude
  //   console.log(latitude, longitude)
  // })
  // fetch(
  //   `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=4dd8f56326a04252a136b1370d3ef109`
  // )
  //   .then(response => response.json())
  //   .then(result => {
  //     if (result.features) {
  //       console.log(result.features[0].properties.formatted)
  //     } else {
  //       console.log('No address found')
  //     }
  //   })

  //    4dd8f56326a04252a136b1370d3ef109

  useEffect(() => {
    
    getUserSearch(query).then(res => {
      setUser(res)
    })
  }, [query])
  const { username, fullname, photo, docId, userId } = user ? user : new Array()
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  // console.log(docId)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        width: { xs: '100vw', sm: 'calc(100vw - 20vw)' },
        ml: { xs: 0, sm: '20vw' },

        bgcolor: !darkMode ? 'white' : 'black'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          pt: '10px'
        }}
      >
        <Input
          placeholder="Procurar"
          autoFocus
          onChange={e => {
            setQuery(e.target.value.toLowerCase())
          }}
          sx={{
            width: '100%',
            height: '50px',
            bgcolor: !darkMode ? '' : 'white',
            fontSize: '1rem',
            padding: '0.5rem',
            borderRadius: '30px',
            '::placeholder': { color: 'red' }
          }}
        />
      </Box>

      {!user ? (
        ''
      ) : (
        <Stack width="100%" alignItems="center" spacing="20px" sx={{ p: '10px 0' }}>
          <UserSearchPage
            Setusername={username}
            Setfullname={fullname}
            Setphoto={photo}
            TargetDocId={docId}
            TargetId={userId}
          />
        </Stack>
      )}
    </Box>
  )
}

export default SearcPage
