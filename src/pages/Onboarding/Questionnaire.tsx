import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVittStore } from '../../store/useVittStore'
import { QUESTIONS } from '../../data/questions'
import Button from '../../components/ui/Button'
import api from '../../services/api'

export default function Questionnaire() {
  const { segment, currentQuestionIndex, answers, addAnswer, goToNextQuestion, goToPreviousQuestion, setScoreResult, setAllocationResult } = useVittStore()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!segment) {
    navigate('/segment')
    return <div className="p-10 text-slate-500 dark:text-slate-400">Redirecting...</div>
  }

  const questionList = QUESTIONS[segment] || []
  const currentQuestion = questionList[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questionList.length - 1

  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id)

  const handleSingleSelect = (optionIndex: number, score: number) => {
    addAnswer({
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension,
      answerIndex: optionIndex,
      rawScore: score,
      isChecklist: false
    })
  }

  const handleChecklistToggle = (itemId: string) => {
    const existingSelections = currentAnswer?.checklistSelections || []
    let newSelections: string[] = []
    
    if (existingSelections.includes(itemId)) {
      newSelections = existingSelections.filter(id => id !== itemId)
    } else {
      newSelections = [...existingSelections, itemId]
    }

    const checklistItems = currentQuestion.checklistItems || []
    const totalPoints = checklistItems
      .filter(item => newSelections.includes(item.id))
      .reduce((sum, item) => sum + item.points, 0)

    addAnswer({
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension,
      answerIndex: 0, 
      rawScore: 0, 
      isChecklist: true,
      checklistSelections: newSelections,
      checklistScore: totalPoints
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/response', { answers, segment })
      setScoreResult(response.data.scoreResult) 
      setAllocationResult(response.data.allocationResult)
      navigate('/dashboard')
    } catch (err) {
      const errorResponse = err as { response?: { data?: { message?: string } } }
      setError(errorResponse.response?.data?.message || 'Failed to submit questionnaire.')
    } finally {
      setLoading(false)
    }
  }

  if (!currentQuestion) return null

  const progress = ((currentQuestionIndex + 1) / questionList.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center justify-center flex-grow min-h-[75vh] w-full animate-fade-in">
      {/* Progress */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-sky-500 to-sky-400 dark:from-sky-400 dark:to-sky-300 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="w-full glass-card">
        <span className="text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 bg-sky-100 dark:bg-slate-800 text-sky-700 dark:text-sky-400 rounded-full mb-4 inline-block capitalize">
          {currentQuestion.dimension.replace(/_/g, ' ')}
        </span>

        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 leading-snug">{currentQuestion.text}</h3>
        {currentQuestion.subtext && <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">{currentQuestion.subtext}</p>}

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-lg w-full mb-4 text-center">{error}</div>}

        {/* Options */}
        <div className="flex flex-col gap-3 mt-6">
          {currentQuestion.type === 'single' && currentQuestion.options?.map((opt, idx) => {
            const isSelected = currentAnswer?.answerIndex === idx
            return (
              <div 
                key={idx}
                onClick={() => handleSingleSelect(idx, opt.score)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                  isSelected 
                    ? 'border-sky-500 dark:border-sky-400 bg-sky-50/50 dark:bg-sky-500/5 text-slate-900 dark:text-white font-bold' 
                    : 'border-slate-200 hover:border-slate-300 bg-white/40 text-slate-700 dark:border-white/5 dark:hover:border-white/10 dark:bg-slate-900/40 dark:text-slate-300'
                }`}
              >
                <span className="text-sm md:text-base pr-4">{opt.text}</span>
                <div className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-sky-500 dark:border-sky-400 bg-sky-500 dark:bg-sky-400' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-450'}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-950"></div>}
                </div>
              </div>
            )
          })}

          {currentQuestion.type === 'checklist' && currentQuestion.checklistItems?.map((item) => {
            const isSelected = currentAnswer?.checklistSelections?.includes(item.id) || false
            return (
              <div 
                key={item.id}
                onClick={() => handleChecklistToggle(item.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                  isSelected 
                    ? 'border-sky-500 dark:border-sky-400 bg-sky-50/50 dark:bg-sky-500/5 text-slate-900 dark:text-white font-bold' 
                    : 'border-slate-200 hover:border-slate-300 bg-white/40 text-slate-700 dark:border-white/5 dark:hover:border-white/10 dark:bg-slate-900/40 dark:text-slate-300'
                }`}
              >
                <span className="text-sm md:text-base pr-4">{item.label}</span>
                <div className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-sky-500 dark:border-sky-400 bg-sky-500 dark:bg-sky-400' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-450'}`}>
                  {isSelected && <div className="text-[10px] text-white dark:text-slate-950 font-bold">✔</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between w-full mt-8">
        <Button 
          variant="outline" 
          disabled={currentQuestionIndex === 0}
          onClick={goToPreviousQuestion}
          className="px-6 disabled:opacity-50"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button 
            variant="gold" 
            onClick={handleSubmit}
            disabled={loading || (currentQuestion.type === 'single' && currentAnswer?.answerIndex === undefined)}
            className="px-8"
          >
            {loading ? 'Submitting...' : 'Finish'}
          </Button>
        ) : (
          <Button 
            variant="gold" 
            onClick={goToNextQuestion}
            disabled={currentQuestion.type === 'single' && currentAnswer?.answerIndex === undefined}
            className="px-8"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
