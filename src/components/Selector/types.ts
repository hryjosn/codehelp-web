export interface Props {
    label: string
    value: string
    dataList: {
        value: string
        code: number
    }[]
    onChange: (value: string) => void
}
