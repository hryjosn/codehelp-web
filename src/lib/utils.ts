import { ClassValue, clsx } from 'clsx'
import { io, Socket } from 'socket.io-client'
import { twMerge } from 'tailwind-merge'
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from '~/container/VideoConference/types'
export const cn = (...input: ClassValue[]) => twMerge(clsx(input))

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'http://localhost:80',
    { transports: ['websocket'] }
)
