import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useVittStore } from '../store/useVittStore'
import Button from '../components/ui/Button'
import { generateInvestmentReport } from '../utils/generateReport'

interface AllocationItem {
  fullName: string
  percentage: number
  color: string
  icon: string
}

export default function Invest() {
  const allocationResult = useVittStore((state) => state.allocationResult)
  const scoreResult = useVittStore((state) => state.scoreResult)
  const user = useVittStore((state) => state.user)
  const segment = useVittStore((state) => state.segment)
  const [amount, setAmount] = useState<string>('2000')
  const [downloading, setDownloading] = useState(false)
  const [isInvested, setIsInvested] = useState(false)

  const allocations: AllocationItem[] = allocationResult 
    ? [
        { fullName: 'Emergency Reserve', percentage: allocationResult.emergencyReserve?.allocationCapPercent || 0, color: '#10b981', icon: '🛡️' },
        ...allocationResult.buckets.map((b, i) => ({
          fullName: b.fullName,
          percentage: b.percentage,
          color: ['#0ea5e9', '#6366f1', '#8b5cf6', '#64748b'][i % 4],
          icon: ['📈', '📊', '🪙', '🚀'][i % 4]
        }))
      ]
    : [
        { fullName: 'Emergency Reserve', percentage: 20, color: '#10b981', icon: '🛡️' },
        { fullName: 'Debt & Stability', percentage: 25, color: '#0ea5e9', icon: '📈' },
        { fullName: 'Equities Growth', percentage: 35, color: '#6366f1', icon: '📊' },
        { fullName: 'Gold / Hedging', percentage: 10, color: '#8b5cf6', icon: '🪙' },
        { fullName: 'Alternative Options', percentage: 10, color: '#64748b', icon: '🚀' }
      ]

  const numAmount = parseFloat(amount) || 0

  // Pure SVG Pie Calculus - Normalize to ensure 100% visual closure
  const totalPercentage = allocations.reduce((sum, item) => sum + Number(item.percentage || 0), 0) || 100
  
  let currentOffset = 0
  const chartRings = allocations.map((item) => {
    const normalizedPercent = (Number(item.percentage || 0) / totalPercentage) * 100
    const dashOffset = currentOffset
    currentOffset += normalizedPercent
    return {
      ...item,
      normalizedPercent,
      dashOffset: -dashOffset // Negative pushes starting point Clockwise forwards
    }
  })

  const handleDownloadReport = () => {
    setDownloading(true)
    try {
      generateInvestmentReport({
        allocations,
        totalAmount: numAmount,
        userName: user?.name || 'Investor',
        profileName: scoreResult?.profileName || 'Balanced',
        band: scoreResult?.band || 5,
        confidenceScore: scoreResult?.finalConfidenceScore || 0,
        segment: segment || user?.segment || 'urban'
      })
    } catch (err) {
      console.error('Failed to generate PDF report:', err)
    } finally {
      setTimeout(() => setDownloading(false), 600)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 w-full animate-fade-in flex flex-col min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mb-5">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Make an <span className="text-sky-500 dark:text-gold-400">Investment</span>
          </h1>
          <p className="text-slate-555 dark:text-slate-400 text-sm mt-1">Calculate and visualize how your money breaks down safely.</p>
        </div>
        <Link to="/dashboard">
          <Button variant="outline" className="flex items-center gap-1 text-xs px-4 py-2 rounded-2xl">
            ← Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        {/* 🟡 Left: Calculator & Visual */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col gap-3 bg-white/40 dark:bg-slate-900/40 rounded-2xl">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-300">Enter Investment Amount (₹)</label>
            <div className="flex gap-4">
              <input 
                type="number" 
                placeholder="e.g. 2000" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-black text-lg focus:outline-none focus:border-sky-500/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="glass-card p-5 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center rounded-2xl shadow-sm bg-white/40 dark:bg-slate-900/40">
            <h4 className="text-sm font-black text-slate-800 dark:text-slate-350 mb-4">Allocation Distribution</h4>
            <div className="relative w-44 h-44">
              <svg viewBox="-3 -3 38 38" className="w-full h-full transform -rotate-90">
                {chartRings.map((item, index) => (
                  <circle
                    key={index}
                    cx="16"
                    cy="16"
                    r="15.91549430918954"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="3.5"
                    strokeDasharray={`${item.normalizedPercent} 100`}
                    strokeDashoffset={item.dashOffset}
                    className="transition-all duration-700 ease-out hover:stroke-slate-950 dark:hover:stroke-white stroke-opacity-90 cursor-pointer"
                    style={{ strokeLinecap: 'butt' }}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-900 dark:text-white">₹{numAmount.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-555 font-bold uppercase tracking-wider mt-0.5">Total Budget</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 justify-center">
              {allocations.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{item.fullName} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🟢 Right: Detailed Cards */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div className="glass-card border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 rounded-2xl flex flex-col">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-white/5 pb-3">
              📊 Breakdown Statements
            </h4>

            <div className="flex flex-col">
              {allocations.map((item: AllocationItem, idx: number) => {
                const invested = (numAmount * (item.percentage / 100)).toFixed(2)
                return (
                  <div key={idx} className={`py-3 flex justify-between items-center group ${idx !== 0 ? 'border-t border-slate-100 dark:border-white/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-white/5 shadow-inner" style={{ color: item.color }}>
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-405 transition-colors">{item.fullName}</h5>
                        <p className="text-[10px] text-slate-505 mt-0.5">Bucket Weight: <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.percentage}%</span></p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-sky-600 dark:text-sky-400 transition-all">₹{parseFloat(invested).toLocaleString()}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">allocated</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button 
            onClick={() => setIsInvested(true)}
            disabled={numAmount <= 0}
            className={`w-full py-3.5 px-5 font-black rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              numAmount <= 0 
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-555 cursor-not-allowed opacity-50' 
                : 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-450 dark:hover:bg-sky-350 text-white dark:text-slate-950 cursor-pointer hover:scale-[1.01] shadow-sky-550/10'
            }`}
          >
            🚀 Complete Investment of ₹{numAmount.toLocaleString()}
          </button>
        </div>
      </div>

      {/* 🔵 Success Overlay Modal */}
      {isInvested && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="glass-card p-10 max-w-md w-full border border-slate-200 dark:border-white/5 flex flex-col items-center text-center rounded-3xl shadow-2xl backdrop-blur-xl bg-white dark:bg-slate-900">
            <div className="w-16 h-16 rounded-full bg-sky-500/10 dark:bg-sky-500/5 flex items-center justify-center text-2xl mb-4 border border-sky-500/20 dark:border-sky-400/20 text-sky-600 dark:text-sky-400 animate-bounce">
              🏆
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Investment Received!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">We got your money invested and you can download the report breakdown statement below flawlessly.</p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={handleDownloadReport}
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-350 text-white dark:text-slate-950 font-black rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                📥 {downloading ? 'Generating PDF...' : 'Download PDF Report'}
              </button>
              <button 
                onClick={() => setIsInvested(false)} 
                className="w-full py-2.5 border border-slate-200 dark:border-white/5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/60 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Close Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
