import { createContext, useContext, useEffect, useState } from 'react'
import FirebaseContext from './firebase'

export const VidsContext = createContext({})

export const VidsContextContextProvider = ({ children }) => {
  const [currentVid, setCurrentVid] = useState('')
  const [openedComment, setOpenedComment] = useState(false)

  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {}, [])

  const pathname = window.location.pathname
  var res = pathname.split('/')

  return (
    <VidsContext.Provider
      value={{
        currentVid,
        setCurrentVid,
        openedComment,
        setOpenedComment
      }}
    >
      {children}
    </VidsContext.Provider>
  )
}
