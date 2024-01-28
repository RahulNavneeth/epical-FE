import { create } from "zustand"

type metaType = {
    clgName: string,
}

type metaStoreType = {
    meta: metaType,
    setMeta: (meta: metaType) => void,
}

export const useMetaStore = create<metaStoreType>((set) => ({
    meta: { clgName: "" },
    setMeta: (meta: metaType) => set({ meta })
}))
