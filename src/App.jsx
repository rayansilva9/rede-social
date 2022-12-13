import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { lazy, Suspense, useContext, useState } from 'react'
import * as ROUTES from './routes/routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/userContext'
import NavBarMobile from './components/navBarMobile'
import LoadingScreen from './pages/loading'
import PrivateRoutes from './routes/privateRoutes'
import { ThemeContext, ThemeContextProvider } from './context/theme'
import {
  UserProfileViewContextProvider,
  UserProfileViewContext
} from './context/userProfileView'
import isOnChat from './context/isOnChat'
import { VidsContextContextProvider } from './context/vidsCurrentContext'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const NotFound = lazy(() => import('./pages/notFound'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const Teste = lazy(() => import('./pages/teste'))
const YourProfilePage = lazy(() => import('./pages/__yourProfile'))
const NewPostPage = lazy(() => import('./pages/newPost'))
const SearcPage = lazy(() => import('./pages/search'))
const SettingsScreen = lazy(() => import('./pages/settings'))
const VidsPage = lazy(() => import('./pages/vids'))
// const Chat = lazy(() => import('./pages/chat'))

function App() {
  const [onChat, setOnChat] = useState(false)
  const { usernameTitle } = useContext(UserProfileViewContext)
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <ThemeContextProvider>
        <VidsContextContextProvider>
          <isOnChat.Provider value={{ onChat, setOnChat }}>
            <BrowserRouter>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="*" element={<Profile />} />
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route path={ROUTES.SIGN_UP} element={<Signup />} />
                  <Route path={ROUTES.VIDS} element={<VidsPage />} />
                  {/* <Route
                  path={`${ROUTES.PROFILE}/${user.displayName}`}
                  element={<YourProfilePage />}
                /> */}
                  <Route
                    path={`${ROUTES.PROFILE}/${usernameTitle}`}
                    element={<Profile />}
                  />
                  {/* ==========  ROTAS_PRIVADAS ==========*/}
                  <Route path={ROUTES.DASHBOARD} element={<PrivateRoutes />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                  </Route>

                  <Route path={ROUTES.NEW_POST} element={<PrivateRoutes />}>
                    <Route path={ROUTES.NEW_POST} element={<NewPostPage />} />
                  </Route>
                  {/* <Route path={ROUTES.YOUR_PROFILE} element={<PrivateRoutes />}>
                  <Route path={ROUTES.YOUR_PROFILE} element={<YourProfilePage />} />
                </Route> */}
                  <Route path={ROUTES.SEARCH} element={<PrivateRoutes />}>
                    <Route path={ROUTES.SEARCH} element={<SearcPage />} />
                  </Route>
                  {/* <Route path={ROUTES.CHAT} element={<PrivateRoutes />}>
                  <Route path={ROUTES.CHAT} element={<Chat />} />
                </Route> */}
                  {/* ==========  ROTAS_PRIVADAS ==========*/}
                  <Route path={ROUTES.SETTINGS} element={<PrivateRoutes />}>
                    <Route path={ROUTES.SETTINGS} element={<SettingsScreen />} />
                  </Route>
                </Routes>
              </Suspense>
              <NavBarMobile />
            </BrowserRouter>
          </isOnChat.Provider>
        </VidsContextContextProvider>
      </ThemeContextProvider>
    </UserContext.Provider>
  )
}

export default App
