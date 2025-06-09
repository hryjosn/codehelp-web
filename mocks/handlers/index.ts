import { userHandlers } from './user'
import { mentorHandlers } from './mentor'
import { chatroomHandlers } from './chatroom'
import { bookingHandlers } from './booking'

export const handlers = [
    ...userHandlers,
    ...mentorHandlers,
    ...chatroomHandlers,
    ...bookingHandlers,
]
