import { MessageData } from '~/lib/types'
import { UserForMentor, UserForMember } from '~/api/user/types'
import { ChatroomInfoT } from '~/container/Chat/store/type'

export interface Props {
    chatroomData: ChatroomInfoT
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
