import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import useElementOnScreen from '../../hooks/elementOnScreen'

export default function PostsFromProfilePage({ src, type, theme, toView, size, size2width, size2height}) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const options = {
    root: null,
    rootMargin: '1px',
    threshold: 0.8
  }

  const isVisibile = useElementOnScreen(options, videoRef)

  const onVideoClick = () => {
    if (window.innerWidth > 600 && !toView) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(!playing)
    } else {
      videoRef.current.play()
      setPlaying(!playing)
    }
  }

  useEffect(() => {
    if (window.innerWidth > 600 && !toView) return

    if (isVisibile) {
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
  }, [isVisibile])

  if (type.includes('image')) {
    return (
      <Box
        sx={{
          width: { xs: '100%', sm: '400px' },
          height: { xs: '400px', sm: '400px' },
          maxWidth: '400px',
          backgroundImage: `url(${src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          m: '0 auto'
        }}
      />
    )
  } else {
    return (
      <Box
        sx={{
          position: 'relative',
          maxWidth:  size2width,
          maxHeight: size2height,
          background: !theme ? 'black' : '#00000053',
          m: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        <div>
          {
            <FaPlay
              style={{
                display: !playing ? 'inline' : 'none',
                position: 'absolute',
                zIndex: 2,
                margin: '45% 55% 55% 45%',
                color: '#ffffff7c',
                fontSize: '3rem'
              }}
            />
          }
          <video
            style={size}
            src={src}
            ref={videoRef}
            onClick={() => {
              onVideoClick()
            }}
            preload="auto"
            loop
            alt="video"
            // onError={console.log('nao carregou')}
          />
        </div>
      </Box>
    )
  }
}
// window.innerWidth

PostsFromProfilePage.propType = {
  src: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string
}
