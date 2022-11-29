import { Box } from '@mui/material'
import PropTypes from 'prop-types'

export default function PostImage({ src, caption }) {
  return (
    <Box
      sx={
        {
          // maxHeight: '',
          // maxWidth: '100%'
        }
      }
    >
      <img
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
          minHeight: '100%',
          minWidth: '100%'
        }}
        src={src}
        alt=""
      />
    </Box>
  )
}

PostImage.propTypes = {
  src: PropTypes.string.isRequired
}
