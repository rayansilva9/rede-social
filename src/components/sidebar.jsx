import { Box } from '@mui/material'
import useUser from '../hooks/use-User'
import Suggestion from './suggestion'

const Sidebar = () => {
  const {
    user: { userId, following, docId }
  } = useUser()
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        gap: 2,
        maxHeight: '400px',
        width: 'auto'
      }}
    >
      <Suggestion userId={userId} following={following} loggedInUserDocId={docId} />
    </Box>
  )
}

export default Sidebar
