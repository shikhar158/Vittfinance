import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Button from '../components/ui/Button'

interface MetricItem {
  value: string
  change?: string
  positive?: boolean
}

interface NewsItem {
  source: string
  pubDate: string
  title: string
  snippet: string
  link: string
  image?: string
}

interface MarketData {
  segment: string
  metrics?: Record<string, MetricItem>
  weather?: {
    temp: number
  }
  news?: NewsItem[]
}

export default function Market() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchMarket = async () => {
    setLoading(true)
    try {
      const response = await api.get('/market')
      setMarketData(response.data)
    } catch {
      console.error('Failed to fetch market data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full animate-fade-in flex flex-col min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Intelligence <span className="text-sky-500 dark:text-gold-400">Board</span>
          </h1>
          <p className="text-slate-555 dark:text-slate-400 text-sm mt-1">Actionable summaries tailored by our computation models.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchMarket} 
            disabled={loading}
            className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl border transition-all ${
              loading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'cursor-pointer border-slate-200 hover:border-slate-350 bg-white/40 text-slate-700 dark:border-white/5 dark:hover:border-white/10 dark:bg-slate-900/40 dark:text-slate-200'
            }`}
          >
            {loading ? 'Updating...' : '🔄 Reload'}
          </button>
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center gap-1 text-xs px-4 py-2 rounded-2xl">
              ← Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex-grow flex items-center justify-center text-slate-500 dark:text-slate-400 animate-pulse text-base">
          Hydrating latest feeds...
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          
          {/* 1. Top Metrics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {Object.entries(marketData?.metrics || { 
              nifty50: { value: "22,040.75", change: "+1.2%", positive: true }, 
              sensex: { value: "72,426.64", change: "+1.15%", positive: true }, 
              gold: { value: "65,340", change: "-0.4%", positive: false } 
            }).map(([key, m]: [string, MetricItem]) => (
              <div key={key} className="glass-card p-5 border border-slate-200 dark:border-white/5 flex justify-between items-center bg-white/40 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-white/10 transition-all rounded-2xl shadow-sm">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-305 capitalize">📌 {key.replace(/_/g, ' ')}</span>
                <div className="flex flex-col items-end">
                  <span className="text-base font-black text-slate-900 dark:text-white">{m.value}</span>
                  {m.change && <span className={`text-xs font-bold ${m.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{m.change}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* 2. Climate Widget for Rural */}
          {marketData?.segment === 'rural' && marketData?.weather && (
            <div className="glass-card p-5 border border-sky-500/20 dark:border-sky-400/20 flex justify-between items-center bg-sky-50/50 dark:bg-sky-500/5 rounded-2xl">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Rural Climate Forecast</div>
                <div className="text-xl font-black text-sky-600 dark:text-sky-400 mt-0.5">{marketData.weather.temp}°C</div>
              </div>
              <div className="text-3xl">🌦️</div>
            </div>
          )}

          {/* 3. Main News Feed list (Reddit full width rows) */}
          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 mb-1 px-1">
              📰 Live Insights 
            </h4>
            
            {marketData?.news?.map((news: NewsItem, idx: number) => {
              // Using LoremFlickr finance keyword for guaranteed diverse visuals
              const displayImage = news.image || `https://loremflickr.com/500/350/finance,chart/all?lock=${idx}`;

              return (
                <div key={idx} className="glass-card p-0 overflow-hidden border border-slate-200 dark:border-white/5 hover:border-sky-500/20 dark:hover:border-sky-450/20 bg-white/40 dark:bg-slate-900/40 transition-all duration-300 flex flex-col md:flex-row shadow-sm group w-full rounded-2xl">
                  <div className="md:w-1/4 w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 overflow-hidden">
                    <img src={displayImage} alt={news.title} className="object-cover w-full h-40 md:h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-6 flex flex-col justify-between md:w-3/4 w-full">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2.5 py-1 bg-sky-100 dark:bg-slate-800 rounded font-extrabold text-sky-700 dark:text-sky-400 text-[10px] uppercase tracking-wider">{news.source}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">{news.pubDate}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{news.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">{news.snippet}</p>
                    </div>
                    <a 
                      href={news.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-350 flex items-center gap-1 self-start group"
                    >
                      Read full coverage <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      )}
    </div>
  )
}
