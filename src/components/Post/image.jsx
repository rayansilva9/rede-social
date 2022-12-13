import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from 'styled-components'
import useElementOnScreen from '../../hooks/elementOnScreen'
import { MediaImg, MediaVideo } from './mediaStyled'


export default function PostImage({ src, type, theme }) {

  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  }

  const isVisibileVideo = useElementOnScreen(options, videoRef)

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



  
  if (type.includes('image')) {
    return <MediaImg src={src} alt="imagem" />
  } else {
    return (
      <Box
        sx={{
          width: '100%',
          maxHeight: '564px',
          background: !theme ? 'black' : '#7d7d7d52',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <MediaVideo
          onClick={() => {
            onVideoClick()
          }}
          ref={videoRef}
          src={src}
          // controls
          preload="auto"
          loop
          alt="video"
          // onError={console.log('nao carregou')}
        />
      </Box>
    )
  }
  //   <MediaVideo
  //     onClick={() => {
  //       onVideoClick()
  //     }}
  //     ref={videoRef}
  //     src={src}
  //     // controls
  //     preload="auto"
  //     loop
  //     alt="video"
  //     // onError={console.log('nao carregou')}
  //     style={{
  //       display: type.includes('image') ? 'none' : 'inline'
  //     }}
  //   />
  //   <MediaImg
  //     style={{
  //       display: type && type.includes('mp4') ? 'none' : 'inline'
  //     }}
  //     src={src}
  //     alt="imagem"
  //   />{' '}
  // </>
}

PostImage.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}
