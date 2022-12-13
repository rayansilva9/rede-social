import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Stories from '../components/stories/Stories'
import Timeline from '../components/timeline'
import { ThemeContext } from '../context/theme'
import useUser from '../hooks/use-User'
import * as ROUTES from '../routes/routes'

const Dashboard = () => {
  const navigate = useNavigate()
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const user = useUser()

  if (!user) {
    return navigate(ROUTES.LOGIN)
  }

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <Stack
      // direction={xs:'column', sm:"row",}
      sx={{
        width: { xs: '100vw', sm: '100vw' },
        pl: { xs: 0, sm: '20vw' },
        minHeight: '100vh',
        pt: { xs: '55px', sm: 0 },
        pb: { xs: '55px', sm: 0 },
        bgcolor: !darkMode ? '#cdd3d9' : '#000000'
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pl: { sx: 0, sm: '0' },
          pr: { xs: 0, sm: '0' },
          width: '100%'
        }}
      >
        <div>
          <Stories />
          <Timeline />
        </div>
      </Box>
    </Stack>
  )
}

export default Dashboard
