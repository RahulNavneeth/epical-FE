import { create } from "zustand"

type metaType = {
    clgName: string,
    timeLimit: number,
    subText: string,
    terms: Array<string>
}

type metaStoreType = {
    meta: metaType,
    setMeta: (meta: metaType) => void,
}

export const useMetaStore = create<metaStoreType>((set) => ({
    meta: { clgName: "", timeLimit: 1, terms: [], subText: "" },
    setMeta: (meta: metaType) => set({ meta })
}))
