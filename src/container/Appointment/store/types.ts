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
    Mon = 1,
    Tue = 2,
    Wed = 3,
    Thu = 4,
    Fri = 5,
    Sat = 6,
    Sun = 7,
}
