import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Stories from '../components/stories/Stories'
import Timeline from '../components/timeline'
import { PreventContext } from '../context/prevent'
import useUser from '../hooks/use-User'
import * as ROUTES from '../routes/routes'

const Dashboard = () => {
  const navigate = useNavigate()

  const user = useUser()

  if (!user) {
    return navigate(ROUTES.LOGIN)
  }

  const { PreventFunction, Prevent } = useContext(PreventContext)

  useEffect(() => {
    document.title = 'Home'
    PreventFunction()
  }, [Prevent])

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight:'100vh',
        pt:{xs: '55px', sm:0,},
        bgcolor: '#cdd3d9'
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pl: { sx: 0, sm: '135px' },
          width: '100%'
        }}
      >
        <div>
          <Stories />
          <Timeline />
        </div>
        {/* <Sidebar /> */}
      </Box>
    </Box>
  )
}

export default Dashboard
