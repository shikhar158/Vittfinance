import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VittStore, Segment, Answer, ScoreResult, AllocationResult } from '../types'

export const useVittStore = create<VittStore>()(
  persist(
    (set) => ({
      // --- Auth State ---
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null, segment: null, currentQuestionIndex: 0, answers: [], scoreResult: null, allocationResult: null }),

      // --- Questionnaire State ---
      segment: null,
      currentQuestionIndex: 0,
      answers: [],
      
      setSegment: (segment: Segment) => set({ segment, currentQuestionIndex: 0, answers: [] }),
      
      addAnswer: (answer: Answer) => set((state) => {
        const withoutExisting = state.answers.filter(a => a.questionId !== answer.questionId)
        return { answers: [...withoutExisting, answer] }
      }),
      
      goToNextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
      
      goToPreviousQuestion: () => set((state) => ({ currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0) })),
      
      resetQuestionnaire: () => set({ currentQuestionIndex: 0, answers: [], scoreResult: null, allocationResult: null }),

      // --- Results State ---
      scoreResult: null,
      allocationResult: null,
      
      setScoreResult: (result: ScoreResult) => set({ scoreResult: result }),
      setAllocationResult: (result: AllocationResult) => set({ allocationResult: result })
    }),
    {
      name: 'vitt-storage',
    }
  )
)
