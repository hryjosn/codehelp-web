import { MessageData } from '~/lib/types'

export interface Props {
    chatroomId: string
}

export interface QueryParams {
    pages: QueryPagesParams[]
    pageParams: number
}
export interface QueryPagesParams {
    total: number
    messages: MessageData[]
}
