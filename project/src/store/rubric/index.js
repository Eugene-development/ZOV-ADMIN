import { create } from 'zustand'

const visibleRubricModal = create(set => ({
    currentVisibleRubricModal: false,
    currentRubric: [],
    openVisibleRubricModal: rubric => {
        set(() => ({ currentRubric: rubric }))
        set(() => ({ currentVisibleRubricModal: true }))
    },
    closeVisibleRubricModal: () =>
        set(() => ({ currentVisibleRubricModal: false })),
}))

export const useRubricStore = {
    visibleRubricModal,
}
