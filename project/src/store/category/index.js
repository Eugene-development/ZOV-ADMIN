import { create } from 'zustand'

const visibleReadCategoryModal = create(set => ({
    currentVisibleReadCategoryModal: false,
    currentReadCategory: [],
    openVisibleReadCategoryModal: category => {
        set(() => ({ currentReadCategory: category }))
        set(() => ({ currentVisibleReadCategoryModal: true }))
    },
    closeVisibleReadCategoryModal: () =>
        set(() => ({ currentVisibleReadCategoryModal: false })),
}))

export const useCategoryStore = {
    visibleReadCategoryModal,
}
