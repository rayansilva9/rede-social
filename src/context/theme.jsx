import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode2] = useState(true)

  // function setDarkMode() {
  //   if (localStorage.getItem('theme') === true) {
  //     setDarkMode2(false)
  //     localStorage.setItem('theme', false)
  //   } else {
  //     console.log('oiii')
  //     setDarkMode2(true)
  //     localStorage.setItem('theme', true)
  //   }
  // }

  document.getElementById('root').style.backgroundColor = !darkMode ? 'white' : 'black'
  const setDarkMode = () => {
    setDarkMode2(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
