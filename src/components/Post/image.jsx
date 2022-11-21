import { Box } from '@mui/material';
import PropTypes from 'prop-types'



export default function PostImage({ src, caption }) {
  return ( 
    <Box sx={{
        // maxHeight: '',
        // maxWidth: '100%'
    }}>
      <img style={{
         maxHeight: 'inherit',
         maxWidth: '100%',
      }} src={ src } alt="" />
    </Box>
   );
}

PostImage.propTypes = {
  src: PropTypes.string.isRequired,
}
 