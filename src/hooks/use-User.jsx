import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext'
import { getUserById } from '../services/firebase'

//  RETORNA O DOCUMENTO DO USUARIO

export default function useUser() {
  const [activeUser, setActiveUser] = useState({})
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjById() {
      const [response] = await getUserById(user.uid)
      setActiveUser(response)
    }
    if (user?.uid) {
      getUserObjById()
    }
  }, [user])
  return { user: activeUser }
}
