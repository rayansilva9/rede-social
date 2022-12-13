import { Box } from '@mui/system'
import { useContext, useEffect, useRef, useState } from 'react'
import useElementOnScreen from '../../hooks/elementOnScreen'
import { BsHeart } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { GoComment } from 'react-icons/go'
import { Stack, Typography } from '@mui/material'
import Swiper from 'swiper'
import { VidsContext } from '../../context/vidsCurrentContext'
import { v4 as uuidv4 } from 'uuid'

const Vids = ({ url }) => {
  const pathname = window.location.pathname

  var res = pathname.split('/')
  const [playing, setPlaying] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const videoRef = useRef(null)
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  }

  const { currentVid, setCurrentVid, openedComment, setOpenedComment } =
    useContext(VidsContext)

  const isVisibileVideo = useElementOnScreen(options, videoRef)

  useEffect(() => {}, [])

  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause()
      setPlaying(!playing)
    } else {
      videoRef.current.play()
      setPlaying(!playing)
    }
  }

  useEffect(() => {
    setCurrentVid(uuidv4())
    if (isVisibileVideo) {
      if (!playing) {
        videoRef.current.play()
        setPlaying(true)
      }
    } else {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      }
    }
  }, [isVisibileVideo])

  const handleOpenComments = () => {
    setOpenComments(true)
    setOpenedComment(true)
  }
 
  return (
    <>
      <Box
        sx={{
          maxWidth: { xs: '100vw', sm: '500px' },
          maxHeight: '100vh',
          minHeight: '100vh',
          position: 'relative',
          top: 0,
          left: 0,
          overflowY: 'hidden'
        }}
      >
        <video
          onClick={() => {
            onVideoClick()
          }}
          ref={videoRef}
          controls
          id="vids"
          style={{}}
          src="https://firebasestorage.googleapis.com/v0/b/redesocial-6ed52.appspot.com/o/ssstik.io_1670900828376.mp4?alt=media&token=e49a4d88-cb06-488b-ae5c-6a11d840b292"
        />
        <Stack
          alignItems="center"
          spacing="20px"
          sx={{
            position: 'absolute',
            right: '10px',
            bottom: '150px',
            color: 'white'
          }}
        >
          <Stack alignItems="center" sx={{ svg: { fontSize: '2rem' } }}>
            <BsHeart />
            <Typography>20k</Typography>
          </Stack>
          <Stack
            onClick={handleOpenComments}
            alignItems="center"
            sx={{ svg: { fontSize: '2rem' } }}
          >
            <BsHeart />
            <Typography>2022</Typography>
          </Stack>
          <Stack alignItems="center" sx={{ svg: { fontSize: '2rem' } }}>
            <BsHeart />
            <Typography>22</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Vids
