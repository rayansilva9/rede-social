import { Box } from '@mui/material'

const ViewPost = ({ src2 }) => {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          width: '90vw',
          height: '300px',
          bgcolor: 'red',
          border: '2px solid #000',
          boxShadow: 24,
          zIndex: 999,
          p: 4
        }}
      >
        adad
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundImage: `url(${src2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          src={src2}
          alt=""
        />
      </Box>
    </>
  )
}

export default ViewPost
