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

const visibleCreateCategoryModal = create(set => ({
    currentVisibleCreateCategoryModal: false,
    openVisibleCreateCategoryModal: () => {
        set(() => ({ currentVisibleCreateCategoryModal: true }))
    },
    closeVisibleCreateCategoryModal: () =>
        set(() => ({ currentVisibleCreateCategoryModal: false })),
}))

const visibleUpdateCategoryModal = create(set => ({
    currentVisibleUpdateCategoryModal: false,
    openVisibleUpdateCategoryModal: () => {
        set(() => ({ currentVisibleUpdateCategoryModal: true }))
    },
    closeVisibleUpdateCategoryModal: () =>
        set(() => ({ currentVisibleUpdateCategoryModal: false })),
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
    visibleCreateCategoryModal,
    visibleUpdateCategoryModal,
    visibleDeleteCategoryModal,
}
