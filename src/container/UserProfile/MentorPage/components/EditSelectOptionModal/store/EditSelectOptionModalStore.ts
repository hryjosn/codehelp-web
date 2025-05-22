import { create } from 'zustand'

type State = {
    isOpen: boolean
    dataList: string[]
    selectedOptionList: string[]
    selectedError: string
    title: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setDataList: (data: string[]) => void
    setSelectedOptionList: (newData: string[]) => void
    setSelectedError: (msg: string) => void
    setTitle: (title: string) => void
    onSave: (data: string[]) => void
    submitFunction?: (state: string[]) => void
    setSubmitFunction: (query: (state: string[]) => void) => void
}

export const useEditSelectOptionModalStore = create<State & Action>()(
    (set, get) => ({
        isOpen: false,
        dataList: [],
        selectedOptionList: [],
        selectedError: '',
        title: '',
        onSave: (data) => {
            const { submitFunction } = get()
            submitFunction?.(data)
        },
        openModal: () => set({ isOpen: true }),
        closeModal: () =>
            set({ isOpen: false, selectedOptionList: [], selectedError: '' }),
        setDataList: (newData) => set({ dataList: newData }),
        setSelectedOptionList: (data) => set({ selectedOptionList: data }),
        setSelectedError: (msg) => set({ selectedError: msg }),
        setTitle: (title) => set({ title }),
        setSubmitFunction: (query) => set({ submitFunction: query }),
    })
)
