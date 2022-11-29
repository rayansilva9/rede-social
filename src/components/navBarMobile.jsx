import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Paper
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegPaperPlane } from 'react-icons/fa'
import { FaPaperPlane } from 'react-icons/fa'
import { BsPlusSquare } from 'react-icons/bs'
import { BsPlusSquareFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../hooks/use-User'
import * as ROUTES from '../routes/routes'
import { Stack } from '@mui/system'
// import ToPage  from '../utils/navigate'

export default function NavBarMobile() {
  const [value, setValue] = useState(0)

  const {
    user: { photo, username }
  } = useUser()

  var largura =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  const navigate = useNavigate()
  const navegar = route => {
    return navigate(route)
  }

  const styleBottomNavigationAction = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: { xs: 'center', sm: 'flex-start' },
    flex: { xs: 1, sm: 'none' },
    height: '60px',
    width: '100%',
    transition: '0.4s linear all',
    borderRadius: ' 15px'
  }

  let a = document.title
  const [title, setTitle] = useState(a)

  const userLocal = localStorage.getItem('authUser')

  const [menu, setMenu] = useState(1)

  return (
    <Paper
      elevation={10}
      sx={{
        position: 'fixed',
        display: userLocal ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 0,
        overflow: 'hidden',
        width: '100vw',
        height: '70px',
        bgcolor: '#ffffff ',
        // backdropFilter:'blur(6px)',
        borderTopRightRadius: '25px',
        borderTopLeftRadius: ' 25px',
        boxShadow: '-1px -19px 73px -18px rgba(0,0,0,0.52)'
      }}
    >
      <Button
        sx={{
          maxWidth: '40px',
          height: '100%',
          p: 0,
          fontSize: '25px',
          color: menu === 1 ? '#000000' : '#858585c8'
        }}
        onClick={() => {
          setMenu(1)
          navegar(ROUTES.DASHBOARD)
        }}
      >
        {menu === 1 ? <AiFillHome /> : <AiOutlineHome />}
      </Button>
      <Button
        sx={{
          maxWidth: '40px',
          height: '100%',
          p: 0,
          fontSize: '25px',
          color: menu === 2 ? 'black' : '#858585c8'
        }}
        onClick={() => {
          setMenu(2)
          // navegar(ROUTES.)
        }}
      >
        {menu === 2 ? <FaSearch /> : <BsSearch />}
      </Button>
      <Button
        sx={{
          maxWidth: '40px',
          height: '100%',
          p: 0,
          fontSize: '25px',
          color: menu === 3 ? 'black' : '#858585c8'
        }}
        onClick={() => {
          setMenu(3)
          navegar(ROUTES.NEW_POST)
        }}
      >
        {menu === 3 ? <BsPlusSquareFill /> : <BsPlusSquare />}
      </Button>
      <Button
        sx={{
          maxWidth: '40px',
          height: '100%',
          p: 0,
          fontSize: '25px',
          color: menu === 4 ? 'black' : '#858585c8'
        }}
        onClick={() => {
          setMenu(4)
          // navegar(ROUTES.)
        }}
      >
        {menu === 4 ? <FaPaperPlane /> : <FaRegPaperPlane />}
      </Button>
      <Button
        sx={{
          maxWidth: '40px',
          height: '100%',
          p: 0,
          fontSize: '25px',
          color: menu === 5 ? 'black' : '#858585c8'
        }}
        onClick={() => {
          setMenu(5)
          navegar(ROUTES.YOUR_PROFILE)
        }}
      >
        <Avatar src={photo} />
      </Button>
    </Paper>
    // <Box
    //   sx={{
    //     overflow: 'hidden',
    //     display: userLocal ? 'inline' : 'none',
    //     width: { xs: '100%', sm: '130px' },
    //     height: { xs: '50px', sm: '100vh' },
    //     position: 'fixed',
    //     bottom: { xs: '0', sm: '0' },
    //     left: { xs: '0', sm: '0' },
    //     p: 0
    //   }}
    // >
    //   <BottomNavigation
    //     sx={{
    //       height: '100%',
    //       width: '100%',
    //       flexDirection: { xs: 'row', sm: 'column' },
    //       alignItems: 'flex-start',
    //       justifyContent: 'flex-start',
    //       p: { sx: 0, sm: '70% 0' }
    //     }}
    //     showLabels
    //     value={value}
    //     onChange={(event, newValue) => {
    //       setValue(newValue)
    //     }}
    //   >
    //     <BottomNavigationAction
    //       style={{ background: value === 0 ? '#c1c1c176' : 'white' }}
    //       sx={styleBottomNavigationAction}
    //       onClick={() => {
    //         navegar(ROUTES.DASHBOARD)
    //       }}
    //       icon={
    //         value === 0 ? (
    //           <Link to="/">
    //             <AiFillHome style={{ fontSize: '25px' }} />
    //           </Link>
    //         ) : (
    //           <Link to="/">
    //             {' '}
    //             <AiOutlineHome style={{ fontSize: '25px' }} />
    //           </Link>
    //         )
    //       }
    //       label={largura <= 600 ? '' : 'Home'}
    //     />
    //     <BottomNavigationAction
    //       style={{ background: value === 1 ? '#c1c1c176' : 'white' }}
    //       sx={styleBottomNavigationAction}
    //       icon={
    //         value === 1 ? (
    //           <FaSearch style={{ fontSize: '25px' }} />
    //         ) : (
    //           <BsSearch style={{ fontSize: '25px' }} />
    //         )
    //       }
    //       label={largura <= 600 ? '' : 'Pesquisar'}
    //     />

    //     <BottomNavigationAction
    //       style={{ background: value === 2 ? '#c1c1c176' : 'white' }}
    //       onClick={() => {
    //         navegar(ROUTES.NEW_POST)
    //       }}
    //       sx={styleBottomNavigationAction}
    //       icon={
    //         value === 2 ? (
    //           <BsPlusSquareFill style={{ fontSize: '25px' }} />
    //         ) : (
    //           <BsPlusSquare style={{ fontSize: '25px' }} />
    //         )
    //       }
    //       label={largura <= 600 ? '' : 'Novo Poste'}
    //     />

    //     <BottomNavigationAction
    //       style={{ background: value === 3 ? '#c1c1c176' : 'white' }}
    //       sx={styleBottomNavigationAction}
    //       icon={
    //         value === 3 ? (
    //           <FaPaperPlane style={{ fontSize: '25px' }} />
    //         ) : (
    //           <FaRegPaperPlane style={{ fontSize: '25px' }} />
    //         )
    //       }
    //       label={largura <= 600 ? '' : 'Perfil'}
    //     />
    //     <BottomNavigationAction
    //       onClick={() => {
    //         navegar(ROUTES.YOUR_PROFILE)
    //       }}
    //       style={{ background: value === 4 ? '#c1c1c176' : 'white' }}
    //       sx={styleBottomNavigationAction}
    //       icon={
    //         photo ? (
    //           <Avatar src={photo} />
    //         ) : (
    //           <Link to="your_profile">
    //             {' '}
    //             <CgProfile
    //               style={{
    //                 fontSize: '25px',
    //                 color: 'unset'
    //               }}
    //             />{' '}
    //           </Link>
    //         )
    //       }
    //       label={largura <= 600 ? '' : 'Perfil'}
    //     />
    //   </BottomNavigation>
    // </Box>
  )
}
