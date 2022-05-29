import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { meAPI } from '../api'
import { setUser, signOut } from '../redux/reducers/app'
import { RootState } from '../redux/store'

type AuthGuardType = {
  children: React.ReactNode
}
function AuthGuard({ children }: AuthGuardType) {
  const { token, user } = useSelector((state: RootState) => state.app)

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const fetchMe = async () => {
    try {
      setIsLoading(true)
      const data = await meAPI()
      dispatch(setUser(data))
    } catch (error) {
      dispatch(signOut())
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMe()
  }, [token])

  if (isLoading) return <div>Loading...</div>

  if (user) return <>{children}</>
  else return <Navigate to="/login" replace />
}

export default AuthGuard
