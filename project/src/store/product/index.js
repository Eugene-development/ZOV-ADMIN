import { create } from 'zustand'

const visibleReadProductModal = create(set => ({
    currentVisibleReadProductModal: false,
    currentReadProduct: [],
    openVisibleReadProductModal: product => {
        set(() => ({ currentReadProduct: product }))
        set(() => ({ currentVisibleReadProductModal: true }))
    },
    closeVisibleReadProductModal: () =>
        set(() => ({ currentVisibleReadProductModal: false })),
}))

export const useProductStore = {
    visibleReadProductModal,
}
