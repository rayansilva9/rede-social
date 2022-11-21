import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

//  RETORNA INFORMAÇÕES DE LOGIN DO USUARIO E ADICIONA AO LocalStorage

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
      } else {
          localStorage.removeItem('authUser')
          setUser(null)
      }
    })
    return () => listener()
  }, [firebase])

  return { user }
}
