import { create } from "zustand"

type AnswerState = {
    answer: Array<[Number, Number] | null>;
    fillAnswer: (len: number) => void
    setAnswer: (idx: number, id: number, ans: Number) => void
}

export const useAnswerStore = create<AnswerState>((set) => ({
    answer: [],
    fillAnswer: (len: number) => set({ answer: Array(len).fill(null) }),
    setAnswer: (idx: number, id: number, ans: Number) => set((state) => {
        const answer = [...state.answer]
        answer[id] = [idx, ans];
        return { answer }
    })
}))

