import { Box } from '@mui/material'
import UserStories from './userStories'

const Stories = () => {
  return (
    <Box
      sx={{mt:'5px',
        width: { xs: '100vw', sm: '500px' },
        height: '85px',
        p: '0px 10px',
        overflowX: 'scroll',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        '&::-webkit-scrollbar': {
          width: '5px',
          bgcolor: 'none'
        },
        '&::-webkit-scrollbar-button': {
          display: 'none'
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'none',
          borderRadius: '10px'
        },
        '&::-webkit-scrollbar-track-piece': {
          bgcolor: 'none',
          borderRadius: '10px'
        }
        // justifyContent: 'center'
      }}
    >
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
      <UserStories />
    </Box>
  )
}

export default Stories
