import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from './types'

export const cn = (...input: ClassValue[]) => twMerge(clsx(input))

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    process.env.NEXT_PUBLIC_API_URL,
    { transports: ['websocket'] }
)
