import { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    api
      .get('/auth/me')
      .then((res) => {
        if (!isMounted) return
        setUser(res.data.user)
      })
      .catch(() => {})
      .finally(() => isMounted && setLoading(false))
    return () => {
      isMounted = false
    }
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data.user)
    return data
  }

  const register = async (name, email, password) => {
    await api.post('/auth/register', { name, email, password })
    return login(email, password)
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}