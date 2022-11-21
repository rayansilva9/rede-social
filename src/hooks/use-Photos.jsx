import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/userContext'
import { getPhotos, getUserById } from '../services/firebase'

export default function usePhotos() {
  const [photos, setPhotos] = useState(null)

  const {
    user: { uid: userId = '' }
  } = useContext(UserContext)

  useEffect(() => {
    async function getTimeLinePhotos() {
      const [{ following }] = await getUserById(userId)

      let followedUserPhoto = [];

      if (following.length > 0) {
        followedUserPhoto = await getPhotos(userId, following)
      }

      followedUserPhoto.sort((a, b) => b.dateCreated - a.dateCreated)
      setPhotos(followedUserPhoto)
    }

    getTimeLinePhotos()
  }, [userId])

  return { photos }
}
