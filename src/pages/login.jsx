// import { useHistory } from "react-router-dom";
import * as ROUTES from '../routes'
import { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../context/firebase'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Login = () => {
  const navigate = useNavigate()
  const userLocal = localStorage.getItem('authUser')

  if (userLocal) {
    useEffect(() => {
      return navigate(ROUTES.DASHBOARD)
    })
  }

  const { firebase } = useContext(FirebaseContext)

  const [emailAddres, setEmailAddres] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const isInvalid = password === '' || emailAddres === ''

  const handleLogin = async e => {
    e.preventDefault()

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddres, password)
      location.reload()
      // navigate(ROUTES.DASHBOARD)
    } catch (error) {
      console.log(error)
      setError(error.message)
      setEmailAddres('')
      setPassword('')
    }
  }

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={({ target }) => setEmailAddres(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
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
              <Link to={ROUTES.SIGN_UP}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
