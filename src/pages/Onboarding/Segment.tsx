import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVittStore } from '../../store/useVittStore'
import Button from '../../components/ui/Button'
import type { Segment as SegmentType } from '../../types'

export default function Segment() {
  const { setSegment, scoreResult } = useVittStore()
  const [selected, setSelected] = useState<SegmentType | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Allowed only once: redirect to dashboard if questionnaire was already submitted
    if (scoreResult) {
      navigate('/dashboard')
    }
  }, [scoreResult, navigate])

  const handleStart = () => {
    if (selected) {
      setSegment(selected)
      navigate('/questionnaire')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center flex-grow min-h-[75vh] w-full animate-fade-in">
      <div className="text-center max-w-xl mb-12">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Select Your <span className="text-sky-500 dark:text-gold-400">Profile</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Which best describes your primary environment? We adapt questions to match your lifestyle context.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        {(['urban', 'semi_urban', 'rural'] as SegmentType[]).map((seg) => {
          const isSelected = selected === seg
          return (
            <div 
              key={seg} 
              onClick={() => setSelected(seg)}
              className={`glass-card cursor-pointer transition-all duration-300 flex flex-col items-center text-center p-8 group border-2 ${
                isSelected 
                  ? 'border-sky-500 dark:border-sky-400 bg-sky-50/50 dark:bg-sky-500/5 shadow-md shadow-sky-500/10' 
                  : 'border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10 bg-white/40 dark:bg-slate-900/40'
              }`}
            >
              <div className={`text-4.5xl mb-5 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                {seg === 'urban' ? '🏙️' : seg === 'semi_urban' ? '🏘️' : '🌾'}
              </div>
              <h3 className={`text-lg font-black mb-2.5 capitalize ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-white'}`}>
                {seg.replace('_', ' ')}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {seg === 'urban' ? 'Corporations, metros & large cities' : seg === 'semi_urban' ? 'Small towns, grid centers & Tier-2' : 'Villages, agricultural trades & farming'}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button 
          variant="gold" 
          disabled={!selected}
          onClick={handleStart}
          className="px-12 py-3.5 text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Attempt Questionnaire
        </Button>
        <p className="text-slate-400 dark:text-slate-500 text-xs flex items-center gap-1">
          <span>📊</span> Assessment can be retaken anytime from your dashboard
        </p>
      </div>
    </div>
  )
}
