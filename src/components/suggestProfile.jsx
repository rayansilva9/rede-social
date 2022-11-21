import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  updateLoggedInUserFollowing,
  updateLoggedInUserFollowers
} from '../services/firebase'

export default function SuggestProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false)

  async function handleFollowedUser() {
    setFollowed(true)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
    await updateLoggedInUserFollowers(profileDocId, userId, false)
  }

  return !followed ? (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      border: '1px solid #00000057',
      p: '5px 5px',
      borderRadius: "10px",
      mt: '10px',
      
    }}>
      <p>{username}</p>
      <Button
        sx={{ width: '30px', height: '20px' }}
        onClick={handleFollowedUser}
        variant="outlined"
      >
        Seguir
      </Button>
    </Box>
  ) : null
}

SuggestProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string
}
