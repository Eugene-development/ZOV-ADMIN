import { create } from 'zustand'

const visibleProductModal = create(set => ({
    currentVisibleProductModal: false,
    currentProduct: [],
    openVisibleProductModal: product => {
        set(() => ({ currentProduct: product }))
        set(() => ({ currentVisibleProductModal: true }))
    },
    closeVisibleProductModal: () =>
        set(() => ({ currentVisibleProductModal: false })),
}))

export const useProductStore = {
    visibleProductModal,
}
