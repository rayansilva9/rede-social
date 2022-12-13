import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import useUser from '../../hooks/use-User'
import * as ROUTES from '../../routes/routes'
import { MdVerified } from 'react-icons/md'
import { Avatar, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme'
import { UserProfileViewContext } from '../../context/userProfileView'

export default function PostHeader({ userName, photo, checked, userId2 }) {
  const {
    user: { username }
  } = useUser()


  const { user, setUser, setUsernameTitle } = useContext(UserProfileViewContext)

  const navigate = useNavigate()

  const titleToProfile = () => {
    setUser(userId2)

    document.title = userName
    setUsernameTitle(userName)
    navigate(`${ROUTES.PROFILE}/${userName}`)
  }
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  return (
    <Box
      onClick={titleToProfile}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        p: '5px 0',
        pl: '10px',
        bgColor: '#c9c9c9',
        color: 'black',
        gap: '15px'
      }}
    >
      <Avatar
        src={photo}
        style={{
          width: '2.6rem',
          height: '2.6rem',
          borderRadius: '50%'
        }}
      />
      <Stack direction="column">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p
            style={{
              fontWeight: '500',
              fontSize: '.99rem',
              fontFamily: "'Poppins', sans-serif",
              color: !darkMode ? 'black' : 'white'
            }}
          >
            {userName}
          </p>
          <MdVerified
            style={{ display: checked === true ? 'inline' : 'none', fontSize: '.9rem' }}
            color="#017cff"
          />
        </div>
        <p
          style={{
            fontWeight: '100',
            fontSize: '0.99rem',
            color: 'gray'
          }}
        >
          Santa Inês, Brasil
        </p>
      </Stack>
    </Box>
  )
}

PostHeader.propTypes = {
  userName: PropTypes.string,
  photo: PropTypes.string,
  checked: PropTypes.bool
}
