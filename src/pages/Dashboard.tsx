import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useVittStore } from '../store/useVittStore'
import api from '../services/api'
import Button from '../components/ui/Button'

interface Bucket {
  key: string
  label: string
  fullName: string
  percentage: number
  color: string
  riskLevel: string
  description: string
}

interface Allocation {
  buckets: Bucket[]
  emergencyReserve?: {
    targetMonths: number
    recommendedInstrument: string
    allocationCapPercent: number
  }
}

export default function Dashboard() {
  const scoreResult = useVittStore((state) => state.scoreResult)
  const setScoreResult = useVittStore((state) => state.setScoreResult)
  const resetQuestionnaire = useVittStore((state) => state.resetQuestionnaire)
  const navigate = useNavigate()
  const [allocation, setAllocation] = useState<Allocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasCheckedBackend, setHasCheckedBackend] = useState(false)

  useEffect(() => {
    const checkAndFetchPortfolio = async () => {
      setLoading(true)
      try {
        const response = await api.get('/portfolio')
        const portfolio = response.data
        setAllocation(portfolio)
        // Sync score from backend if we don't have it locally
        if (!scoreResult && portfolio.finalConfidenceScore) {
          setScoreResult({
            finalConfidenceScore: portfolio.finalConfidenceScore,
            rawScore: portfolio.rawScore || 0,
            normalizedRawScore: portfolio.normalizedRawScore || 0,
            band: portfolio.band,
            profileName: portfolio.profileName,
            dimensionScores: portfolio.dimensionScores || {}
          })
        }
      } catch (err: any) {
        if (err?.response?.status === 404) {
          // User has NOT completed questionnaire — clear any stale local state
          useVittStore.setState({ scoreResult: null, allocationResult: null })
        } else {
          setError('Failed to fetch portfolio data.')
        }
      } finally {
        setLoading(false)
        setHasCheckedBackend(true)
      }
    }

    checkAndFetchPortfolio()
  }, [])

  // Show loading while checking backend
  if (!hasCheckedBackend) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 w-full animate-fade-in">
        <div className="text-sm text-slate-500 animate-pulse">Loading your profile...</div>
      </div>
    )
  }

  if (!scoreResult) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 w-full animate-fade-in">
        <div className="glass-card max-w-md p-10 flex flex-col items-center text-center border border-slate-200 shadow-xl relative overflow-hidden backdrop-blur-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-550/5 to-transparent pointer-events-none"></div>
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-3xl mb-5 border border-sky-500/10 shadow-inner relative z-10">
            📊
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2 relative z-10">Initialize Your Profile</h3>
          <p className="mb-6 text-slate-500 text-sm leading-relaxed relative z-10">
            Complete a quick questionnaire to unlock your financial blueprint and get intelligent asset allocations.
          </p>
          <Link to="/segment" className="relative z-10">
            <Button variant="gold" className="px-8 py-3 flex items-center gap-2 font-semibold shadow-md">
              Start Questionnaire <span>→</span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center w-full animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-2">
        Your Financial <span className="text-sky-500 dark:text-gold-400">Blueprint</span>
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-12 text-center">
        Tailored recommendations based on continuous calculations and adaptive thresholds.
      </p>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 text-xs p-3 rounded-lg w-full mb-6 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {/* Score Card */}
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center col-span-1 border border-slate-200 dark:border-white/5">
          <div className="text-6xl font-black text-sky-650 dark:text-sky-450 mb-2">
            {scoreResult.finalConfidenceScore?.toFixed(1)}
          </div>
          <div className="text-[10px] font-extrabold text-slate-400 dark:text-slate-555 uppercase tracking-widest mb-6">
            Confidence Score
          </div>
          <div className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-full shadow-sm mb-2.5">
            {scoreResult.profileName}
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-4">Band {scoreResult.band} / 10</div>
          
          <button
            onClick={() => {
              resetQuestionnaire()
              navigate('/segment')
            }}
            className="text-[11px] font-bold text-sky-600 hover:text-sky-700 border border-sky-200 hover:border-sky-300 bg-sky-50/50 hover:bg-sky-100/60 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5"
          >
            🔄 Reattempt Questionnaire
          </button>
        </div>

        {/* Allocation/Buckets Card */}
        <div className="glass-card p-8 col-span-2 flex flex-col h-full border border-slate-200 dark:border-white/5">
          <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-2.5">
            Recommended Asset Allocation
          </h3>
          
          {loading ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 animate-pulse py-8 text-center">Fetching allocation weights...</div>
          ) : (
            <div className="flex flex-col gap-6">
              {allocation?.buckets?.map((bucket: Bucket) => (
                <div key={bucket.key} className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold text-slate-850 dark:text-slate-200 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bucket.color }}></div>
                      {bucket.label} <span className="text-slate-400 dark:text-slate-500 font-normal">({bucket.riskLevel})</span>
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{bucket.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${bucket.percentage}%`, backgroundColor: bucket.color }}></div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 pl-4 leading-relaxed">{bucket.description}</p>
                </div>
              ))}

              {allocation?.emergencyReserve && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                    🛡️ Emergency Reserve Buffer
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Targets <span className="text-slate-900 dark:text-white font-semibold">{allocation.emergencyReserve.targetMonths} months</span> of expenses. 
                    Recommended Instrument: <span className="text-sky-600 dark:text-sky-400 font-bold">{allocation.emergencyReserve.recommendedInstrument}</span>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 📊 Intelligence Page CTA Banner */}
      <div className="w-full mt-10 border-t border-slate-200 dark:border-white/5 pt-8">
        <Link to="/market" className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-200 dark:border-white/5 hover:border-sky-500/20 dark:hover:border-sky-400/20 hover:bg-sky-500/5 dark:hover:bg-sky-400/5 transition-all duration-300 group">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
              🧠 Intelligence Board
            </h4>
            <p className="text-xs text-slate-555 dark:text-slate-400 leading-relaxed max-w-lg">
              Explore live market index benchmarks, climate briefs, or agricultural rates tailored to your profile segment node setups formulas forwards.
            </p>
          </div>
          <div className="text-xs font-bold text-sky-600 dark:text-sky-405 group-hover:text-sky-500 dark:group-hover:text-sky-350 flex items-center gap-1 transition-colors">
             Access Feeds <span className="group-hover:translate-x-1 transition-transform duration-200">➔</span>
          </div>
        </Link>
      </div>

    </div>
  )
}
