import { Box, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getSuggestedProfile } from '../services/firebase'
import SuggestProfile from './suggestProfile'

//  RETORNA PERFIS DE SUGESTÕES

export default function Suggestion({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState()

  useEffect(() => {
    async function SuggestedProfile() {
      const response = await getSuggestedProfile(userId, following)
      setProfiles(response)
    }
    if (userId) {
      SuggestedProfile()
    }
  }, [userId])


  return !profiles ? (
    <Skeleton
      variant="rounded"
      animation="wave"
      width={100}
      height={500}
      sx={{ m: '20px 0 ' }}
    />
  ) : (
    <Box sx={{ mt: '50px', bgcolor: 'white' }}>
      {profiles.map(profile => (
        <SuggestProfile
          key={profile.docId}
          profileDocId={profile.docId}
          username={profile.username}
          profileId={profile.userId}
          userId={userId}
          loggedInUserDocId={loggedInUserDocId}
        />
      ))}
    </Box>
  )
}

Suggestion.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
}
