import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Appbar from './components/appbar.component'
import AuthGuard from './components/authGuard.component'
import Footer from './components/footer.component'
import { CHAT_AUTH_TOKEN_NAME } from './constants'
import SocketProvider from './contexts/socketProvider'
import Auth from './pages/auth.page'
import Home from './pages/home.page'
import { RootState } from './redux/store'
function App() {
  const token = useSelector((state: RootState) => state.app.token)
  const [appbarTitle, setAppbarTitle] = useState<string | JSX.Element>('')

  useEffect(() => {
    localStorage.setItem(CHAT_AUTH_TOKEN_NAME, token)
  }, [token])

  return (
    <SocketProvider>
      <div className="App">
        <Appbar title={appbarTitle} />
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/:id"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />

          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/signup" element={<Auth type="signup" />} />
        </Routes>
        <Footer />
      </div>
    </SocketProvider>
  )
}

export default App
