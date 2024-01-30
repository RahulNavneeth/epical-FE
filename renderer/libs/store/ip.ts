import { create } from "zustand"

type IPStoreType = {
    ip: string
    setIP: (ip: string) => void
}

export const useIPStore = create<IPStoreType>((set) => ({
    ip: "",
    setIP: (ip) => set({ ip }),
}))
