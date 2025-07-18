import { UserForMentor, UserForMember } from '~/api/user/types'

export interface Props {
    chatroomId: string
    userData: UserForMember | UserForMentor
}
