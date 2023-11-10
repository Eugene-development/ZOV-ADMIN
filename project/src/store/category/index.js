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

const visibleDeleteCategoryModal = create(set => ({
    currentVisibleDeleteCategoryModal: false,
    currentDeleteCategory: [],
    openVisibleDeleteCategoryModal: category => {
        set(() => ({ currentDeleteCategory: category }))
        set(() => ({ currentVisibleDeleteCategoryModal: true }))
    },
    closeVisibleDeleteCategoryModal: () =>
        set(() => ({ currentVisibleDeleteCategoryModal: false })),
}))

export const useCategoryStore = {
    visibleReadCategoryModal,
    visibleDeleteCategoryModal,
}
