import { login, memberSignUp } from './user'
import { getMentorInfo } from './mentor'

export const handlers = [...login, ...memberSignUp, ...getMentorInfo]
