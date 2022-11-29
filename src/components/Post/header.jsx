import { Avatar, Stack } from '@mui/material'
import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import { RiInputMethodFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/use-User'
import * as ROUTES from '../../routes/routes'
import { MdVerified } from 'react-icons/md'

export default function PostHeader({ userName, photo, checked }) {
  const {
    user: { username }
  } = useUser()

  const navigate = useNavigate()
  const titleToProfile = () => {
    if (username === username) {
      navigate(ROUTES.YOUR_PROFILE)
    } else {
      document.title = username
      navigate(ROUTES.PROFILE)
    }
  }

  return (
    <Box
      onClick={titleToProfile}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        pb: '10px',
        pl: '10px',
        bgColor: '#c9c9c9',
        color: 'black',
        gap: '15px'
      }}
    >
      <img
        src={photo}
        style={{
          width: 45,
          height: 45,
          borderRadius: '50%'
        }}
      />
      <Stack direction="column">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p
            style={{
              fontWeight: '500',
              fontSize: '16px',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            {username}
          </p>
          <MdVerified display={checked === true ? 'inline' : 'none'} color="#017cff" />
        </div>
        <p
          style={{
            fontWeight: '100',
            fontSize: '14px',
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
  userName: PropTypes.string.isRequired,
  photo: PropTypes.string,
  checked: PropTypes.bool
}
