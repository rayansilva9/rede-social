import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import usePhotos from '../hooks/use-Photos'
import useUser from '../hooks/use-User'
import { avatarUser } from '../services/firebase'
import Post from './post'

const Timeline = () => {
  const navigate = useNavigate()

  const user = useUser()
  const {
    user: { username, fullname, docId, userPhoto }
  } = useUser()

  const { photos } = usePhotos()

  return (
    <Box
      sx={{
        mt: '20px'
      }}
    >
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width={370}
              height={670}
              sx={{ m: '20px 0 ' }}
            />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map(content =>
          content.imageSrc ? <Post key={content.docId} content={content} /> : null
        )
      ) : (
        <p>Siga pessoas para ver fotos</p>
      )}
    </Box>
  )
}

export default Timeline
