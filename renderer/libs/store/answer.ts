import { create } from "zustand"

type AnswerState = {
    answer: Array<Number | null>;
    fillAnswer: (len: number) => void
    setAnswer: (id: number, ans: Number) => void
}

export const useAnswerStore = create<AnswerState>((set) => ({
    answer: [],
    fillAnswer: (len: number) => set({ answer: Array(len).fill(null) }),
    setAnswer: (id: number, ans: Number) => set((state) => {
        const answer = [...state.answer]
        answer[id] = ans
        return { answer }
    })
}))

