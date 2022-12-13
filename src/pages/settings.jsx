import {
  Avatar,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography
} from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useContext, useRef, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import useUser from '../hooks/use-User'
import { ThemeContext } from '../context/theme'
import styled from '@emotion/styled'
import { db, storage } from '../lib/firebase'
import { useMemo } from 'react'
import FirebaseContext from '../context/firebase'
import { FaTrash } from 'react-icons/fa'
import { BiImageAdd } from 'react-icons/bi'
import useAuthListener from '../hooks/use-auth-listener'

const SettingsScreen = () => {
  const {
    user: { username, photo, banner, fullname, bio, emailAddres, userId, docId }
  } = useUser()

  //  console.log(useUser())

  const [openPerfilEdit, setOpenPerfilEdit] = useState(false)
  const [usernameVal, setUsernameVal] = useState('')
  const [bioVal, setBioVal] = useState('')
  const [fullnameVal, setFullnameVal] = useState('')
  const [profilePic, setProfilePic] = useState(photo)
  const [bannerPic, setBannerPic] = useState(banner)

  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const { firebase } = useContext(FirebaseContext)

  const inpuUsernameRef = useRef(null)
  const inpuBioRef = useRef(null)
  const inpuFullnameRef = useRef(null)

  let user = useUser()
  let userActive = useAuthListener()

  const LogOut = () => {
    firebase.auth().signOut()

    localStorage.removeItem('authUser')
    userActive = null
    user = null

    // Location.reload()
  }

  const items = [
    {
      nome: 'Editar perfil',
      icon: <FaUserEdit />,
      open: () => {
        setOpenPerfilEdit(true)
      }
    },
    { nome: 'Mudar senha', icon: <FaUserEdit />, open: '' },
    { nome: 'Sair', icon: <FaUserEdit />, open: LogOut }
  ]

  const inputStyle = {
    background: '#e2e2e2',
    height: '2.5rem',
    width: '100%',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    padding: '2px 4px'
  }

  const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    position: 'relative',
    top: '-18px',
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: !darkMode ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: !darkMode ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: !darkMode ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  }))

  const handleSubmit = async e => {
    e.preventDefault()
    await firebase
      .firestore()
      .collection('users')
      .doc(docId)
      .update({
        username: usernameVal === '' ? username : usernameVal,
        bio: bioVal === '' ? bio : bioVal,
        fullname: fullnameVal === '' ? fullname : fullnameVal
      })
    handleUploadProfilePic()
    handleUploadBannerPic()
  }

  const handlePhoto = e => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = readerEvent => {
      setProfilePic(readerEvent.target.result)
    }
  }
  const handleBanner = e => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = readerEvent => {
      setBannerPic(readerEvent.target.result)
    }
  }

  const handleUploadProfilePic = async () => {
    const upload = storage.ref(`avatar/${docId}`).putString(profilePic, 'data_url')

    upload.on(
      'state_change',
      (() => {},
      error => {},
      async snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Completo', progress)

        await storage
          .ref('banner')
          .child(docId)
          .getDownloadURL()
          .then(photo => {
            firebase.firestore().collection('users').doc(docId).set(
              {
                photo: photo
              },
              { merge: true }
            )
          })
      })
    )
  }
  const handleUploadBannerPic = async () => {
    const upload = storage.ref(`avatar/${docId}`).putString(bannerPic, 'data_url')

    upload.on(
      'state_change',
      (() => {},
      error => {},
      async snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Completo', progress)

        await storage
          .ref('avatar')
          .child(docId)
          .getDownloadURL()
          .then(photo => {
            firebase.firestore().collection('users').doc(docId).set(
              {
                banner: photo
              },
              { merge: true }
            )
          })
      })
    )
  }

  return (
    <>
      {openPerfilEdit && (
        <Box
          sx={{
            width: ' 100vw',
            height: '100vh',
            position: 'fixed',
            bgcolor: '#03030387',
            zIndex: 3
          }}
        >
          <Stack
            component="form"
            noValidate
            onSubmit={handleSubmit}
            spacing="1rem"
            id="openPerfilEdit"
            sx={{
              position: 'fixed',
              top: '47%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#fff',
              width: ' 98%',
              height: '90%',
              p: '10px 10px',
              borderRadius: '20px',
              borderTopLeftRadius: '0px'
            }}
          >
            <GrClose
              onClick={() => {
                setOpenPerfilEdit(false)
              }}
              style={{ position: 'absolute', top: '5px', left: '5px' }}
            />
            <Stack
              alignItems="center"
              spacing="2rem"
              justifyContent="center"
              direction="row"
              sx={{ width: ' 100%', height: 'auto' }}
            >
              {' '}
              <Box
                sx={{
                  backgroundImage: `url(${bannerPic && bannerPic})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: '100%',
                  height: '150px',
                  position: 'sticky',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  mb: '45px'
                }}
              >
                <Button
                  sx={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '10px',
                    p: 'none',
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    svg: { fontSize: '20px', color: 'black' },
                    ':hover': {
                      boxShadow: 'none',
                      bgcolor: 'transparent'
                    }
                  }}
                  variant="contained"
                  component="label"
                >
                  <BiImageAdd />
                  <input onChange={handleBanner} hidden accept="image/*" type="file" />
                </Button>
                <Button
                  sx={{
                    position: 'relative',
                    top: '50px',
                    p: 'none',
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    ':hover': {
                      boxShadow: 'none',
                      bgcolor: 'transparent'
                    }
                  }}
                  variant="contained"
                  component="label"
                >
                  <Avatar
                    sx={{
                      width: ' 7rem',
                      height: '7rem',
                      border: '5px solid white'
                    }}
                    src={profilePic ? profilePic : photo}
                  />
                  <input onChange={handlePhoto} hidden accept="image/*" type="file" />
                </Button>{' '}
              </Box>
              <IconButton
                onClick={() => {
                  setProfilePic(null)
                }}
                sx={{ display: profilePic ? 'inline' : 'none' }}
              >
                <FaTrash fontSize="1.5rem" color="red" />
              </IconButton>
            </Stack>
            <Box>
              <Box>
                <Typography fontWeight="bold" fontSize="1rem">
                  Nome
                </Typography>
                <input
                  type="text"
                  ref={inpuUsernameRef}
                  onChange={e => {
                    setUsernameVal(e.target.value)
                  }}
                  placeholder={username}
                  style={inputStyle}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold" fontSize="1rem">
                  Nome de Usuario
                </Typography>
                <input
                  type="text"
                  ref={inpuFullnameRef}
                  onChange={e => {
                    setFullnameVal(e.target.value)
                  }}
                  placeholder={fullname}
                  style={inputStyle}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold" fontSize="1rem">
                  Biografia
                </Typography>
                <input
                  type="text"
                  ref={inpuBioRef}
                  onChange={e => {
                    setBioVal(e.target.value)
                  }}
                  placeholder={bio}
                  style={inputStyle}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold" fontSize="1rem">
                  Email
                </Typography>
                <input type="text" placeholder={emailAddres} style={inputStyle} />
              </Box>
              <Box>
                <Typography fontWeight="bold" fontSize="1rem">
                  Senha
                </Typography>
                <input type="text" style={inputStyle} />
              </Box>
            </Box>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              Confirmar
            </Button>
          </Stack>
        </Box>
      )}
      <Stack
        minHeight="100vh"
        sx={{ bgcolor: !darkMode ? 'white' : 'black', pt: '20px' }}
      >
        <Stack zIndex="0" width="100%">
          <FormGroup>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  checked={darkMode ? true : false}
                  sx={{ m: 1 }}
                  defaultChecked
                  onClick={() => {
                    setDarkMode(!darkMode)
                  }}
                />
              }
              label="MUI switch"
            />
          </FormGroup>
        </Stack>
        {items.map(item => (
          <div key={item.nome}>
            <Stack
              p=".3rem 1rem"
              direction="row"
              onClick={item.open}
              sx={{
                width: '100%',
                svg: {
                  fontSize: '1.3rem',
                  mr: '1rem',
                  color: !darkMode ? 'black' : 'white'
                },
                mb: '1rem'
              }}
            >
              {item.icon}
              <Typography color={!darkMode ? 'black' : 'white'} fontSize="1rem">
                {item.nome}
              </Typography>
            </Stack>
            <Divider />
          </div>
        ))}
      </Stack>
    </>
  )
}

export default SettingsScreen
