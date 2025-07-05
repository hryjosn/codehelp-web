import { UserForMentor } from '~/api/user/types'

export interface Props {
    onSave: (data: UserForMentor) => void
}
