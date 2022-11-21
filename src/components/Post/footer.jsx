import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function PostFooter({ caption, username }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        mb:2,
      }}
    >
      <Typography fontWeight='bold'>{username}</Typography>

      <Typography>{caption}</Typography>
    </Box>
  )
}

PostFooter.propTypes = {
  caption: PropTypes.string,
  username: PropTypes.string
}
