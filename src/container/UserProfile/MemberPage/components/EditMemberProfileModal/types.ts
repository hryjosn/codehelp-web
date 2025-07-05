import { UserForMember } from '~/api/user/types'
export interface Props {
    onSave: (data: UserForMember) => void
}
