import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/bundle'
import Vids from '../components/Vids/Vids'
import { Box } from '@mui/material'
import { useContext, useEffect, useRef } from 'react'
import { VidsContext } from '../context/vidsCurrentContext'
import { useMemo } from 'react'

const VidsPage = () => {
  const { currentVid, setCurrentVid, openedComment, setOpenedComment } =
    useContext(VidsContext)
  useMemo(() => {
    console.log(currentVid)
  }, [currentVid])

  const handleCloseComments = () => {
    setOpenedComment(false)
  }

  return (
    <>
      <Box sx={{ position: 'relative', overflowY: 'hidden', maxHeight: '100vh' }}>
        <Swiper
          modules={[A11y]}
          direction="vertical"
          slidesPerView={1}
          style={{ height: '100vh', width: 'auto' }}
        >
          <SwiperSlide>
            <Vids />
          </SwiperSlide>
          <SwiperSlide>
            <Vids />
          </SwiperSlide>
          <SwiperSlide>
            <Vids />
          </SwiperSlide>
        </Swiper>
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            bottom: openedComment ? '0' : '-100vh'
          }}
        >
          <Box
            onClick={handleCloseComments}
            sx={{
              flex: 1,
              zIndex: 10,

              bgcolor: 'transparent'
            }}
          ></Box>
          <Box
            sx={{
              zIndex: 10,
              width: '100%',
              height: '400px',
              bgcolor: 'cyan'
            }}
          ></Box>
        </Box>
      </Box>
    </>
  )
}

export default VidsPage
