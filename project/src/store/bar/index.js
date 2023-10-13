import { create } from 'zustand'

const visibleBar = create(set => ({
    currentVisibleBar: false,
    openVisibleBar: () => set(() => ({ currentVisibleBar: true })),
    closeVisibleBar: () => set(() => ({ currentVisibleBar: false })),
}))

export const useBarStore = {
    visibleBar,
}
