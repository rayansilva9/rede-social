import { createContext, useContext, useEffect, useState } from 'react'
import FirebaseContext from './firebase'

export const UserProfileViewContext = createContext({})

export const UserProfileViewContextProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [usernameTitle, setUsernameTitle] = useState('home')
  const [userInfo, setUserInfo] = useState({
    username: '',
    fullname: '',
    photo: '',
    bio: '',
    followers: [],
    following: []
  })

  const [posts, setUserPosts] = useState()

  const { firebase } = useContext(FirebaseContext)
  // const currentURL = window.location.href // returns the absolute URL of a page

  const pathname = window.location.pathname
  var res = pathname.split('/')
  // console.log(res[2])

  useEffect(() => {
    async function getUserinfo() {
      const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', user)
        .get()

      const [Info] = result.docs.map(res => res.data())
      setUserInfo(Info)
    }

    async function getUserPosts() {
      const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', user)
        .get()

      const media = result.docs.map(res => res.data())
      setUserPosts(media)
    }
    getUserinfo()
    getUserPosts()
  }, [user])

  return (
    <UserProfileViewContext.Provider
      value={{
        user,
        setUser,
        userInfo,
        posts,
        usernameTitle,
        setUsernameTitle
      }}
    >
      {children}
    </UserProfileViewContext.Provider>
  )
}
