export interface AppointmentT {
    day: string
    timeCode: number[]
}
export interface SelectedItem {
    [key: string]: {
        day: number
        time: number
    }
}

export enum Days {
    MON = 1,
    TUE = 2,
    WED = 3,
    THU = 4,
    FRI = 5,
    SAT = 6,
    SUN = 7,
}
