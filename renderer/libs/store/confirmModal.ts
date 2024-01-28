import { create } from 'zustand'

type ConfirmModalState = {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const useConfirmModal = create<ConfirmModalState>((set) => ({
    isOpen: false,
    onConfirm: () => set({ isOpen: true }),
    onCancel: () => set({ isOpen: false }),
}))
