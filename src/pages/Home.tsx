import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useVittStore } from '../store/useVittStore'

export default function Home() {
  const token = useVittStore((state) => state.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [token, navigate])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
      <div className="max-w-3xl mt-12 mb-8 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.15] text-slate-900 dark:text-white">
          Intelligent Investing <br />
          <span className="text-sky-500 dark:text-gold-400">for Every Indian</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Smart onboarding that adapts to your life context. Compute your investment confidence score and create intelligent asset allocations tailored to your segment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="gold" className="w-full sm:w-auto text-base px-8 py-3.5 shadow-md">Get Started</Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-3.5 bg-white/40 dark:bg-transparent border border-slate-300 dark:border-white/10">Log In</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        {/* Card 1 */}
        <div className="glass-card p-8 flex flex-col items-start text-left hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
          <div className="bg-emerald-500/10 dark:bg-emerald-500/5 p-3.5 rounded-2xl mb-5 text-emerald-500 dark:text-emerald-400 font-bold text-xl shadow-inner">
            📊
          </div>
          <h3 className="text-xl font-black mb-2.5 text-slate-900 dark:text-white">Smart Confidence Score</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Analyzes dimensions like income stability and behaviors to score your safety thresholds accurately.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="glass-card p-8 flex flex-col items-start text-left hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
          <div className="bg-sky-500/10 dark:bg-gold-500/5 p-3.5 rounded-2xl mb-5 text-sky-600 dark:text-gold-400 font-bold text-xl shadow-inner">
            🌱
          </div>
          <h3 className="text-xl font-black mb-2.5 text-slate-900 dark:text-white">Contextual Adapters</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Questionnaires adaptable for Urban, Semi-urban, and Rural lifestyles accommodating layouts cleanly.
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-8 flex flex-col items-start text-left hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
          <div className="bg-teal-500/10 dark:bg-teal-500/5 p-3.5 rounded-2xl mb-5 text-teal-600 dark:text-teal-400 font-bold text-xl shadow-inner">
            🛡️
          </div>
          <h3 className="text-xl font-black mb-2.5 text-slate-900 dark:text-white">Emergency Buffer Cap</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Automatically reserves caps buffer size before calculating growth allocations accurately to prevent defaults.
          </p>
        </div>
      </div>
    </div>
  )
}
