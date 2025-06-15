import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'

// Utility
import { getDecryptedData } from './utils/cryptoUtils' // adjust path
import PageTitle from './PageTitle'
import Loader from './common/Loader/loader'
import { AuthProvider } from './utils/authContext'

// Lazy loaded components
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const SignIn = React.lazy(() => import('./views/pages/authentication/login'))

const AppWrapper = () => {
  const [loading, setLoading] = useState(true)
  const storedTheme = useSelector((state) => state.theme)
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {
    const themeParam = new URLSearchParams(window.location.search).get('theme')
    if (themeParam) {
      setColorMode(themeParam.match(/^[A-Za-z0-9\s]+/)[0])
    } else if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) return <Loader />

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Sign In" />
                <SignIn />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />

          {/* Protected Routes in DefaultLayout */}
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </AuthProvider>
      <ToastContainer style={{ zIndex: 99999 }} />
    </Suspense>
  )
}

// Wrap with Router
const App = () => (
  <HashRouter>
    <AppWrapper />
  </HashRouter>
)

export default App
