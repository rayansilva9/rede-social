import { Avatar, Button, Paper, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegPaperPlane } from 'react-icons/fa'
import { FaPaperPlane } from 'react-icons/fa'
import { BsPlusSquare } from 'react-icons/bs'
import { BsPlusSquareFill } from 'react-icons/bs'
import useUser from '../hooks/use-User'
import * as ROUTES from '../routes/routes'
import { useNavigate } from 'react-router-dom'
import isOnChat from '../context/isOnChat'

export default function NavBarMobile() {
  const {
    user: { username, photo }
  } = useUser()

  let a = document.title
  const [title, setTitle] = useState(a)

  const userLocal = localStorage.getItem('authUser')

  const [menu, setMenu] = useState(1)
  const navigate = useNavigate()
  const { onChat, setOnChat } = useContext(isOnChat)

  const pathname = window.location.pathname

  var res = pathname.split('/')

  return (
    <Paper
      elevation={10}
      sx={{
        position: 'fixed',
        display: userLocal ? (res[1] === 'vids' ? 'none' : 'flex') : 'none',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: { xs: 'center', sm: 'flex-start' },
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
        bottom: onChat ? '-100%' : '0',
        transition: 'all .3s linear',
        gap: { sm: '2rem' },
        pt: { xs: '0', sm: '2rem' },
        overflow: 'hidden',
        width: { xs: '100vw', sm: '10vw', md: '15vw' },
        height: { xs: '3.4rem', sm: '100vh' },
        bgcolor: '#ffffff ',
        borderTopRightRadius: { xs: ' 25px', sm: '45px' },
        borderTopLeftRadius: { xs: ' 25px', sm: '0' },
        borderBottomRightRadius: { xs: ' 0', sm: '45px' },
        boxShadow: '-1px -19px 73px -18px rgba(0,0,0,0.52)',
        zIndex: 30
      }}
    >
      <Button
        sx={{
          display: 'flex',
          justifyContent: { xs: '', sm: 'center', md: 'flex-start' },
          gap: '2rem',
          alignItems: { xs: 'center', sm: 'center' },
          width: { xs: '40px', sm: '100%' },
          height: { xs: '100%', sm: '50px' },
          background: menu === 1 ? '##858585c8' : '',
          p: 0,
          pl: { xs: '0', sm: '0', md: '2rem' },
          fontSize: '25px',
          color: menu === 1 ? '#000000' : '#858585c8',
          bgcolor: { xs: '#ffffff6', sm: menu === 1 ? '#ddd6d6d7' : '' },
          borderTopRightRadius: { xs: 'none', sm: '25px' },
          borderBottomRightRadius: { xs: 'none', sm: '25px' },
          '&:hover': {
            bgcolor: { xs: 'unset', sm: '#ddd6d6d7' }
          }
        }}
        onClick={() => {
          setMenu(1)
          navigate(ROUTES.DASHBOARD)
        }}
      >
        {menu === 1 ? <AiFillHome /> : <AiOutlineHome />}
        <Typography sx={{ display: { xs: 'none', md: 'inline' } }}>Home</Typography>
      </Button>
      <Button
        sx={{
          display: 'flex',
          justifyContent: { xs: '', sm: 'center', md: 'flex-start' },
          gap: '2rem',
          alignItems: { xs: 'center', sm: 'center' },

          width: { xs: '40px', sm: '100%' },
          height: { xs: '100%', sm: '50px' },
          pl: { xs: '0', sm: '0', md: '2rem' },

          fontSize: '25px',
          color: menu === 2 ? 'black' : '#858585c8',
          bgcolor: { xs: '#ffffff6', sm: menu === 2 ? '#ddd6d6d7' : '' },
          borderTopRightRadius: { xs: 'none', sm: '25px' },
          borderBottomRightRadius: { xs: 'none', sm: '25px' },
          '&:hover': {
            bgcolor: { xs: 'unset', sm: '#ddd6d6d7' }
          }
        }}
        onClick={() => {
          setMenu(2)
          navigate(ROUTES.SEARCH)
        }}
      >
        {menu === 2 ? <FaSearch /> : <BsSearch />}
        <Typography sx={{ display: { xs: 'none', md: 'inline' } }}>Search</Typography>
      </Button>
      <Button
        sx={{
          display: 'flex',
          justifyContent: { xs: '', sm: 'center', md: 'flex-start' },
          gap: '2rem',

          alignItems: { xs: 'center', sm: 'center' },
          width: { xs: '40px', sm: '100%' },
          height: { xs: '100%', sm: '50px' },
          pl: { xs: '0', sm: '0', md: '2rem' },

          fontSize: '25px',
          color: menu === 3 ? 'black' : '#858585c8',
          bgcolor: { xs: '##fff', sm: menu === 3 ? '#ddd6d6d7' : '' },
          borderTopRightRadius: { xs: 'none', sm: '25px' },
          borderBottomRightRadius: { xs: 'none', sm: '25px' },
          '&:hover': {
            bgcolor: { xs: 'unset', sm: '#ddd6d6d7' }
          }
        }}
        onClick={() => {
          setMenu(3)
          navigate(ROUTES.NEW_POST)
        }}
      >
        {menu === 3 ? <BsPlusSquareFill /> : <BsPlusSquare />}
        <Typography sx={{ display: { xs: 'none', md: 'inline' } }}>New Post</Typography>
      </Button>
      <Button
        disabled
        sx={{
          display: 'flex',
          justifyContent: { xs: '', sm: 'center', md: 'flex-start' },
          gap: '2rem',

          alignItems: { xs: 'center', sm: 'center' },
          width: { xs: '40px', sm: '100%' },
          height: { xs: '100%', sm: '50px' },
          pl: { xs: '0', sm: '0', md: '2rem' },
          fontSize: '25px',
          color: menu === 4 ? 'black' : '#858585c8',
          bgcolor: { xs: '#ffffff6', sm: menu === 4 ? '#ddd6d6d7' : '' },
          borderTopRightRadius: { xs: 'none', sm: '25px' },
          borderBottomRightRadius: { xs: 'none', sm: '25px' },
          '&:hover': {
            bgcolor: { xs: 'unset', sm: '#ddd6d6d7' }
          }
        }}
        // onClick={() => {
        //   setMenu(4)
        //   navigate(ROUTES.CHAT)
        // }}
      >
        {menu === 4 ? <FaPaperPlane /> : <FaRegPaperPlane />}
        <Typography sx={{ display: { xs: 'none', md: 'inline' } }}>Message</Typography>
      </Button>
      <Button
        sx={{
          display: 'flex',
          justifyContent: { xs: '', sm: 'center', md: 'flex-start' },
          gap: '2rem',

          alignItems: { xs: 'center', sm: 'center' },
          width: { xs: '40px', sm: '100%' },
          height: { xs: '100%', sm: '50px' },
          pl: { xs: '0', sm: '0', md: '2rem' },
          fontSize: '25px',
          color: menu === 5 ? 'black' : '#858585c8',
          bgcolor: { xs: '#ffffff6', sm: menu === 5 ? '#ddd6d6d7' : '' },
          borderTopRightRadius: { xs: 'none', sm: '25px' },
          borderBottomRightRadius: { xs: 'none', sm: '25px' },
          '&:hover': {
            bgcolor: { xs: 'unset', sm: '#ddd6d6d7' }
          }
        }}
        onClick={() => {
          setMenu(5)
          navigate(`${ROUTES.PROFILE}/${username}`)
        }}
      >
        <Avatar src={photo} />
        <Typography sx={{ display: { xs: 'none', md: 'inline' } }}>Perfil</Typography>
      </Button>
    </Paper>
  )
}
