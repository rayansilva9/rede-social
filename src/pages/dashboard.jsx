import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'
import { PreventContext } from '../context/prevent'
import useUser from '../hooks/use-User'
import * as ROUTES from "../routes"

const Dashboard = () => {
  const navigate = useNavigate()

  const { PreventFunction, Prevent } = useContext(PreventContext)

  useEffect(() => {
    document.title = "Home"
    PreventFunction()
  },[Prevent])
  return (
    <Box sx={{
      width: "100vw",
      pt: "55px",
      bgcolor:'#f4f4f4',
    }}>
      <Header />
      <Box sx={{
        display: "flex",
        justifyContent: "space-around",
        pl: { sx: 0, sm: '135px', },
        width:'100%',
      }}>
        <Timeline />
        <Sidebar />
      </Box>
    </Box>
  )
}

export default Dashboard
