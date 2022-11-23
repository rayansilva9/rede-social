import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../routes/routes'

export default function PostHeader({ username, photo }) {
  const navigate = useNavigate()
  const titleToProfile = () => {
    document.title = username 
    // console.log("", document.title)
     navigate(ROUTES.PROFILE) 
  }

  return (
    <Box
      onClick={titleToProfile}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        pb: '10px',
        pl: '10px',
        bgColor: '#c9c9c9',
        color: 'black',
        gap: '15px'
      }}
    >
      <Avatar src={photo} />
      <p
        style={{
          fontWeight: 'bold'
        }}
      >
        {username}
      </p>
    </Box>
  )
}

PostHeader.propTypes = {
  username: PropTypes.string.isRequired,
  photo: PropTypes.string
}
