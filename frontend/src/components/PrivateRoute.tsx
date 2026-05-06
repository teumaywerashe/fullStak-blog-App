import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  return localStorage.getItem('token') ? <>{children}</> : <Navigate to="/" replace />
}

export default PrivateRoute
