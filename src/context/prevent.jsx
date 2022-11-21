import { createContext, useEffect, useState } from 'react'



export const PreventContext = createContext({})

export const PreventProvider = ({ children }) => {


  const [Prevent, setPrevent] = useState(false)

  function PreventFunction () {
    setPrevent(true)
   
  }

   
  return (
    <PreventContext.Provider
      value={{
        Prevent,
        PreventFunction
      }}
    >
      {children}
    </PreventContext.Provider>
  )
}
