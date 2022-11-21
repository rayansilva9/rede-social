import { Avatar, Box } from '@mui/material'
import PropTypes from 'prop-types'

export default function ProfileAvatar({ ProfilePic }) {
  return (
    <Box
      sx={{
        width: { xs: '90px', sm: ' 80px', md: '100px' },
        height: { xs: '90px', sm: '80px', md: '100px' }
      }}
    >
      <Avatar
        sx={{
          width: '100%',
          height: '100%'
        }}
        src={ProfilePic}
        alt="user picture"
      />
    </Box>
  )
}
ProfileAvatar

ProfileAvatar.propTypes = {
  ProfilePic: PropTypes.string
}
