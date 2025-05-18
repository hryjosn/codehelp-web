import { useEditMemberProfileModalStore } from './components/EditMemberProfileModal/store/EditMemberProfileModalStore'
import compressImage from '~/utils/compressImage'

const { setNewMemberInfo, setAvatarPreview } =
    useEditMemberProfileModalStore.getState()

export const inputChange = (
    event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
) => {
    const { name, value } = event.target
    setNewMemberInfo({ [name]: value })
}

export const selectChange = ({
    name,
    value,
}: {
    name: string
    value: string | boolean
}) => {
    setNewMemberInfo({ [name]: value })
}

export const avatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
) => {
    if (event.target.files && event.target.files[0]) {
        const compressedImage = await compressImage(event)
        if (compressedImage) {
            const imageURL = URL.createObjectURL(compressedImage)
            setAvatarPreview(imageURL)
            setNewMemberInfo({ avatar: compressedImage })
        }
    }
}
