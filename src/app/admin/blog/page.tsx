'use client'

import { useEffect, useState } from 'react'
import AdminBlog from '@/components/AdminBlog'
import { useRouter } from 'next/navigation'

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  // Simple authentication - replace with proper auth system
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') { // Replace with proper auth
      setIsAuthenticated(true)
      localStorage.setItem('isAdminAuthenticated', 'true')
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true'
    setIsAuthenticated(isAuth)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <form onSubmit={handleLogin} className="bg-black/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return <AdminBlog />
} 