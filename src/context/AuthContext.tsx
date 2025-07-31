import type { User } from '@/interfaces/index'
import React from 'react'

interface AuthContextProps {
  user: User | null
  login: (user: User) => void
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = React.createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth deve estar dentro de um AuthProvider')
  return context
}
