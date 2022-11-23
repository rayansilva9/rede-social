import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/userContext'
import { getPhotos, getUserById } from '../services/firebase'
import * as ROUTES from "../routes/routes"
import useUser from './use-User'

export default function usePhotos() {
  const [photos, setPhotos] = useState(null)

  const navigate = useNavigate()

  const user = useUser()

  if (!user) {
   return navigate(ROUTES.LOGIN)
  }

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
