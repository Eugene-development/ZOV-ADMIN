import { create } from 'zustand'

const visibleReadRubricModal = create(set => ({
    currentVisibleReadRubricModal: false,
    currentReadRubric: [],
    openVisibleReadRubricModal: rubric => {
        set(() => ({ currentReadRubric: rubric }))
        set(() => ({ currentVisibleReadRubricModal: true }))
    },
    closeVisibleReadRubricModal: () =>
        set(() => ({ currentVisibleReadRubricModal: false })),
}))

const visibleCreateRubricModal = create(set => ({
    currentVisibleCreateRubricModal: false,
    allRubric: [],
    openVisibleCreateRubricModal: allRubric => {
        set(() => ({ allRubric }))
        set(() => ({ currentVisibleCreateRubricModal: true }))
    },
    closeVisibleCreateRubricModal: () =>
        set(() => ({ currentVisibleCreateRubricModal: false })),
}))

const visibleUpdateRubricModal = create(set => ({
    currentVisibleUpdateRubricModal: false,
    currentUpdateRubric: [],
    allMenu: [],
    openVisibleUpdateRubricModal: (category, allMenu) => {
        set(() => ({ currentUpdateRubric: category }))
        set(() => ({ allMenu }))
        set(() => ({ currentVisibleUpdateRubricModal: true }))
    },
    closeVisibleUpdateRubricModal: () =>
        set(() => ({ currentVisibleUpdateRubricModal: false })),
}))

const visibleDeleteRubricModal = create(set => ({
    currentVisibleDeleteRubricModal: false,
    currentDeleteRubric: [],
    openVisibleDeleteRubricModal: category => {
        set(() => ({ currentDeleteRubric: category }))
        set(() => ({ currentVisibleDeleteRubricModal: true }))
    },
    closeVisibleDeleteRubricModal: () =>
        set(() => ({ currentVisibleDeleteRubricModal: false })),
}))

export const useRubricStore = {
    visibleReadRubricModal,
    visibleCreateRubricModal,
    visibleUpdateRubricModal,
    visibleDeleteRubricModal,
}
