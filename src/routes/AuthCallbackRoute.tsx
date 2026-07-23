import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { clearStoredSession } from '../lib/auth'

function AuthCallbackRoute() {
  const location = useLocation()
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    let accessToken = searchParams.get('access_token')

    if (!accessToken) {
      const hash = location.hash.startsWith('#')
        ? location.hash.slice(1)
        : location.hash
      const hashParams = new URLSearchParams(hash)
      accessToken = hashParams.get('access_token')
    }

    if (accessToken) {
      localStorage.setItem('deathbed.accessToken', accessToken)
      setRedirectTo('/dashboard')
    } else {
      clearStoredSession()
      setRedirectTo('/login')
    }
  }, [location])

  if (!redirectTo) {
    return null
  }

  return <Navigate to={redirectTo} replace />
}

export default AuthCallbackRoute