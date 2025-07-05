import { UserForMentor, UserForMember } from '~/api/user/types'

export interface Props {
    roomId: string
    userData: UserForMentor | UserForMember
}
