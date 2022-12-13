import { Skeleton, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useRef } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/theme'
import usePhotos from '../hooks/use-Photos'
import useUser from '../hooks/use-User'
import useLazyLoad from '../hooks/useLoadLazy'
import Post from './post'
import clsx from 'clsx'

const Timeline = () => {
  const { photos } = usePhotos()

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  return (
    <Box
      sx={{
        mt: '0px',
        mb: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Stack key={index} sx={{ p: '30px 0' }}>
              <Stack direction="row" spacing="10px" animation="wave">
                <Skeleton
                  variant="circular"
                  sx={{
                    width: '40px',
                    height: '40px',
                    bgcolor: !darkMode ? '' : '#bdbdbd5f'
                  }}
                />
                <Skeleton
                  variant="retangular"
                  animation="wave"
                  sx={{
                    flex: '1',
                    height: '40px',
                    bgcolor: !darkMode ? '' : '#bdbdbd5f'
                  }}
                />
              </Stack>
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                  m: '20px 0 ',
                  width: { xs: 370, sm: 450 },
                  height: 500,
                  bgcolor: !darkMode ? '' : '#bdbdbd5f'
                }}
              />
            </Stack>
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map(content => <Post key={content.docId} content={content} />)
      ) : (
        <p style={{ color: !darkMode ? 'black' : '#ccc' }}>
          Siga pessoas para ver fotos
        </p>
      )}
    </Box>
  )
}

export default Timeline
