import { Box, Divider, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function PostFooter({ caption, username }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: '0px 15px',
          width: '100%',
          mb: '5px'
        }}
      >
        <Typography fontWeight="bold">{username}</Typography>

        <Typography sx={{
          wordBreak:'break-all',
        }}>{caption}</Typography>
      </Box>
      <Divider sx={{ borderColor: '#0000001e', m: '0 auto', width: '95%' }} />
    </>
  )
}

PostFooter.propTypes = {
  caption: PropTypes.string,
  username: PropTypes.string
}
