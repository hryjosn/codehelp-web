// FIXME: Temporarily create fake time option for static booking feature

export enum BookingState {
    idle = 'idle',
    booked = 'booked',
    notAvailable = 'notAvailable',
}
export interface MOCK_TIME_OPTIONS_T {
    time: string
    state: 'idle' | 'booked' | 'notAvailable'
}

// If the user selects a date, the API will be called to obtain MOCK_TIME_OPTIONS, as shown below
export const MOCK_TIME_OPTIONS: MOCK_TIME_OPTIONS_T[] = [
    { time: '2024-07-16T07:00:00+02:00', state: 'idle' },
    { time: '2024-07-16T07:30:00+02:00', state: 'booked' },
    { time: '2024-07-16T08:00:00+02:00', state: 'notAvailable' },
    { time: '2024-07-16T08:30:00+02:00', state: 'booked' },
    { time: '2024-07-16T09:00:00+02:00', state: 'idle' },
    { time: '2024-07-16T09:30:00+02:00', state: 'booked' },
    { time: '2024-07-16T10:00:00+02:00', state: 'booked' },
    { time: '2024-07-16T10:30:00+02:00', state: 'notAvailable' },
    { time: '2024-07-16T11:00:00+02:00', state: 'booked' },
    { time: '2024-07-16T11:30:00+02:00', state: 'notAvailable' },
    { time: '2024-07-16T12:00:00+02:00', state: 'notAvailable' },
    { time: '2024-07-16T12:30:00+02:00', state: 'booked' },
    { time: '2024-07-16T13:00:00+02:00', state: 'booked' },
    { time: '2024-07-16T13:30:00+02:00', state: 'idle' },
    { time: '2024-07-16T14:00:00+02:00', state: 'idle' },
    { time: '2024-07-16T14:30:00+02:00', state: 'idle' },
    { time: '2024-07-16T15:00:00+02:00', state: 'idle' },
    { time: '2024-07-16T15:30:00+02:00', state: 'idle' },
    { time: '2024-07-16T16:00:00+02:00', state: 'notAvailable' },
    { time: '2024-07-16T16:30:00+02:00', state: 'booked' },
    { time: '2024-07-16T17:00:00+02:00', state: 'booked' },
    { time: '2024-07-16T17:30:00+02:00', state: 'booked' },
    { time: '2024-07-16T18:00:00+02:00', state: 'booked' },
    { time: '2024-07-16T18:30:00+02:00', state: 'idle' },
]
