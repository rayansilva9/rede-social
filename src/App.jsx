import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import * as ROUTES from './routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/userContext'
import NavBarMobile from './components/navBarMobile'
import LoadingScreen from './pages/loading'
import { PreventProvider } from './context/prevent'
import PrivateRoutes from './privateRoutes'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const NotFound = lazy(() => import('./pages/notFound'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const YourProfilePage = lazy(() => import('./pages/yourProfile'))
const NewPostPage = lazy(() => import('./pages/newPost'))

function App() {
  const { user } = useAuthListener()
  return (
    <UserContext.Provider value={{ user }}>
      <PreventProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGN_UP} element={<Signup />} />
              <Route path={ROUTES.DASHBOARD} element={<PrivateRoutes />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              </Route>
              <Route path={ROUTES.PROFILE} element={<PrivateRoutes />}>
                <Route path={ROUTES.PROFILE} element={<Profile />} />
              </Route>
              <Route path={ROUTES.NEW_POST} element={<PrivateRoutes />}>
                <Route path={ROUTES.NEW_POST} element={<NewPostPage />} />
              </Route>
              <Route path={ROUTES.YOUR_PROFILE} element={<PrivateRoutes />}>
                <Route path={ROUTES.YOUR_PROFILE} element={<YourProfilePage />} />
              </Route>
            </Routes>
          </Suspense>
          <NavBarMobile />
        </BrowserRouter>
      </PreventProvider>
    </UserContext.Provider>
  )
}

export default App
