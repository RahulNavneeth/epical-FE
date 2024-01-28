import { create } from "zustand"

export type problemSetType = {
    "SNO": number,
    "Question": string,
    "Option-A": string,
    "Option-B": string,
    "Option-C": string,
    "Option-D": string,
}

type ProblemSetState = {
    problemSet: problemSetType[]
    setProblemSet: (problemSet: problemSetType[]) => void
}

export const useProblemSet = create<ProblemSetState>((set) => ({
    problemSet: [],
    setProblemSet: (problemSet: problemSetType[]) => set({ problemSet }),
}))
