import { create } from "zustand"

export type candidateType = {
    candidateName: string,
    regNo: string,
}

type CandidateState = {
    candidate: candidateType | null,
    setCandidate: (candidate: candidateType) => void
}

export const useCandidateStore = create<CandidateState>((set) => ({
    candidate: null,
    setCandidate: (candidate: candidateType) => set({ candidate })
}))

