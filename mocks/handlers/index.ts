import { userHandlers } from './user'
import { mentorHandlers } from './mentor'
import { chatroomHandlers } from './chatroom'

export const handlers = [
    ...userHandlers,
    ...mentorHandlers,
    ...chatroomHandlers,
]
