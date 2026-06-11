import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import api from '../../services/api'
import { useVittStore } from '../../store/useVittStore'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const setAuth = useVittStore((state) => state.setAuth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/register', { name, email, password, pincode })
      setAuth(response.data.token, response.data.user)
      navigate('/segment') 
    } catch (err) {
      const errorResponse = err as { response?: { data?: { message?: string } } }
      setError(errorResponse.response?.data?.message || 'Failed to register. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md px-6 py-12 mx-auto flex flex-col justify-center flex-grow min-h-[75vh]">
      <div className="glass-card flex flex-col items-center">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Account</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 text-center">Start your intelligent investing journey</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs p-3 rounded-xl w-full mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 block">Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-sky-400 dark:focus:border-teal-500 focus:bg-white transition-all duration-300"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 block">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-sky-400 dark:focus:border-teal-500 focus:bg-white transition-all duration-300"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 block">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-sky-400 dark:focus:border-teal-500 focus:bg-white transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 block">Pincode</label>
            <input 
              type="text" 
              required 
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-sky-400 dark:focus:border-teal-500 focus:bg-white transition-all duration-300"
              placeholder="110001"
            />
          </div>

          <Button type="submit" variant="gold" className="w-full mt-2" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <p className="text-slate-500 dark:text-slate-400 text-xs mt-6">
          Already have an account? <Link to="/login" className="text-sky-500 hover:text-sky-600 dark:text-gold-400 dark:hover:text-gold-300 font-bold transition-colors">Log in here</Link>
        </p>
      </div>
    </div>
  )
}
