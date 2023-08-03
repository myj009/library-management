import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PublicRoute({children}: any) {
  const { user } = useAuth()
  return user ? <Navigate replace to="/" /> :  <>{children}</>
}

export default PublicRoute