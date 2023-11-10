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

export const useRubricStore = {
    visibleReadRubricModal,
}
