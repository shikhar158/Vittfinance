import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { useVittStore } from './store/useVittStore'

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Segment from './pages/Onboarding/Segment'
import Questionnaire from './pages/Onboarding/Questionnaire'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import Invest from './pages/Invest'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useVittStore((state) => state.token)
  if (!token) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { token, clearAuth } = useVittStore()

  // Make sure dark mode class is completely removed on mount
  useEffect(() => {
    window.document.documentElement.classList.remove('dark')
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-transparent text-slate-800 transition-colors duration-300">
        {/* Navigation */}
        <header 
          className="border-b py-4 px-6 backdrop-blur-md sticky top-0 z-50 transition-all duration-300"
          style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex flex-col items-start select-none">
              <div className="font-serif text-2xl font-black text-slate-900 flex items-baseline leading-none tracking-wide">
                VITT<span className="text-sky-500">.</span>
              </div>
              <span className="text-slate-555 text-[10px] tracking-widest font-light mt-1">finance with wit</span>
            </Link>

            <div className="flex items-center gap-4">
              {token && (
                <>
                  <Link to="/invest" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    Invest 💰
                  </Link>
                  <div className="w-px h-3 bg-slate-200"></div>
                  <Link to="/market" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    Feed 🧠
                  </Link>
                  <div className="w-px h-3 bg-slate-200"></div>
                  <button 
                    onClick={clearAuth} 
                    className="text-xs text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-500/10 hover:bg-red-50/50 px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1"
                  >
                    Logout ➔
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/segment" element={<ProtectedRoute><Segment /></ProtectedRoute>} />
            <Route path="/questionnaire" element={<ProtectedRoute><Questionnaire /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
            <Route path="/invest" element={<ProtectedRoute><Invest /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
