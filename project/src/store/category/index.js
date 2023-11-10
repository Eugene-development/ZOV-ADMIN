import { create } from 'zustand'

const visibleCategoryModal = create(set => ({
    currentVisibleCategoryModal: false,
    currentCategory: [],
    openVisibleCategoryModal: category => {
        set(() => ({ currentCategory: category }))
        set(() => ({ currentVisibleCategoryModal: true }))
    },
    closeVisibleCategoryModal: () =>
        set(() => ({ currentVisibleCategoryModal: false })),
}))

export const useCategoryStore = {
    visibleCategoryModal,
}
