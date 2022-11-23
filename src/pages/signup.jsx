// import { useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from 'react'
import FirebaseContext from '../context/firebase'
import { doesUsernameExist } from '../services/firebase'
import { storage } from '../lib/firebase'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../routes/routes'

const Signup = () => {
  const navigate = useNavigate()

  const userLocal = localStorage.getItem('authUser')

  if (userLocal) {
    useEffect(() => {
      return navigate(ROUTES.DASHBOARD)
    })
  }

  const { firebase } = useContext(FirebaseContext)

  const bar = useRef(null)

  const [file, setFile] = useState()

  const [emailAddres, setEmailAddres] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [photo, setPhoto] = useState(null)

  const [error, setError] = useState('')

  const isInvalid =
    password === '' || emailAddres === '' || username === '' || fullname === ''

  const handlePhoto = e => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = readerEvent => {
      setPhoto(readerEvent.target.result)
    }
    console.log(photo)
  }

  const handleSignup = async e => {
    e.preventDefault()
    const usernameExist = await doesUsernameExist(username)
    if (!usernameExist.length) {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddres, password)
      await createdUserResult.user.updateProfile({
        displayName: username
      })

      firebase
        .firestore()
        .collection('users')
        .add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddres: emailAddres.toLowerCase(),
          following: ['gkqqGRdFxOTlb0BoUrlTDrQoiNz1'],
          followers: [],
          dateCreated: Date.now(),
          bio: ''
        })
        .then(doc => {
          const upload = storage.ref(`avatar/${doc.id}`).putString(photo, 'data_url')

          upload.on(
            'state_change',
            (() => {},
            error => {},
            async snapshot => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Completo', progress)
              bar.current.value = progress

              await storage
                .ref('avatar')
                .child(doc.id)
                .getDownloadURL()
                .then(photo => {
                  firebase.firestore().collection('users').doc(doc.id).set(
                    {
                      photo: photo
                    },
                    { merge: true }
                  )
                })
            })
          )
        })
    } else {
      setError('username ja existe')
    }
  }

  useEffect(() => {
    document.title = 'Sign-Up'
  }, [])

  // const handleFile = e => {
  //   const reader = new FileReader()

  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0])
  //   }

  //   reader.onload = readerEvent => {
  //     setFile(readerEvent.target.result)
  //   }
  //   console.log(file)
  // }

  return (
    <Container component="main" maxWidth="xs">
      <input ref={bar} type="range" value="0" min="0" max="100" />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {photo ? (
          <Avatar
            src={photo}
            sx={{ m: 1, bgcolor: 'secondary.main', width: 90, height: 90 }}
          >
            <input onChange={handlePhoto} hidden accept="image/*" type="file" />
          </Avatar>
        ) : (
          <Avatar
            src={photo}
            sx={{ m: 1, bgcolor: 'secondary.main', width: 90, height: 90 }}
          >
            <Button
              sx={{
                bgcolor: 'transparent',
                boxShadow: 'none'
              }}
              variant="contained"
              component="label"
            >
              Upload
              <input onChange={handlePhoto} hidden accept="image/*" type="file" />
            </Button>{' '}
          </Avatar>
        )}
        <Button
          variant="outlined"
          sx={{ display: photo ? 'inline' : 'none' }}
          onClick={() => {
            setPhoto(null)
          }}
        >
          Remover
        </Button>

        <Typography component="h1" variant="h5">
          sign up
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            value={username}
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Fullname"
            label="Fullname"
            value={fullname}
            onChange={({ target }) => setFullname(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={emailAddres}
            autoComplete="email"
            onChange={({ target }) => setEmailAddres(target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={isInvalid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.LOGIN}>{'Have an account? Sign Up'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup

// upload.on(
//   'state_change',
//   null,
//   err => console.log(err),
//   (snapshot) => {

//     storage
//       .ref('avatar')
//       .child(doc.id)
//       .getDownloadURL()
//       .then(photo => {
//         firebase.firestore().collection('users').doc(doc.id).set(
//           {
//             photo: photo
//           },
//           { merge: true }
//         )
//       })
//     console.log(doc.id)
//   }
// )

// location.reload()
