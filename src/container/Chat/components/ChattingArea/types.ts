import { MessageData } from '~/lib/types'
import { UserForMentor, UserForMember } from '~/api/user/types'

export interface Props {
    chatroomId: string
    userData: UserForMember | UserForMentor
}

export interface QueryParams {
    pages: QueryPagesParams[]
    pageParams: number
}
export interface QueryPagesParams {
    total: number
    messages: MessageData[]
}
