import { Box, Divider, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme'

export default function PostFooter({ caption, username }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext)

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
        <Typography color={!darkMode ? 'black' : 'white'} fontWeight="bold">
          {username}
        </Typography>

        <Typography
          color={!darkMode ? 'black' : '#e3e0e0'}
          sx={{
            wordBreak: 'break-all'
          }}
        >
          {caption}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#0000001e', m: '0 auto', width: '95%' }} />
    </>
  )
}

PostFooter.propTypes = {
  caption: PropTypes.string,
  username: PropTypes.string
}
