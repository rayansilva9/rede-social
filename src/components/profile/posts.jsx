import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import YourProfilePage from '../../pages/yourProfile'

export default function PostsFromProfilePage({ imageSrc }) {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '300px' },
        height: '500px',
        mb: '20px'
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%'
        }}
        src={imageSrc}
        alt="falha ao Carregar"
      />
    </Box>
  )
}

PostsFromProfilePage.propType = {
  imageSrc: PropTypes.string
}
