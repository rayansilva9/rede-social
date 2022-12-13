import { IconButton, Stack, Typography } from '@mui/material'
import { useRef } from 'react'
import { useContext, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../routes/routes';


const Header = () => {
  const [active, setActive] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const headerRef = useRef(null)

  function hidden() {
    setScrollTop(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop > scrollTop) {
      setActive('-50px')
    } else {
      setActive('0')
    }
  }
  window.onscroll = function () {
    hidden()
  }

  const navigate = useNavigate()


  return (
    <>
      <Stack
        ref={headerRef}
        sx={{
          position: 'fixed',
          zIndex: 99,
          top: active,
          mt: '1px',
          p: '0 10px',
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '50px',
          width: '100vw',
          bgcolor: '#cdd3d98e',
          backdropFilter: 'blur(3px)',
          borderRadius: '20px',
          transition: 'top 0.2s linear',
          boxShadow: '0px 2px 9px 0px rgba(0,0,0,0.42)'
        }}
      >
        <IconButton
          onClick={() => {
            navigate(ROUTES.SETTINGS)
          }}
          aria-label="delete"
        >
          <AiOutlineSetting />
        </IconButton>
        <Typography>Desgram-a</Typography>
        <IconButton aria-label="delete">
          <HiOutlineMail />
        </IconButton>
      </Stack>
    </>
  )
}

export default Header
