import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivateRoute({children}: any) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate replace to="/login" />
}

export default PrivateRoute