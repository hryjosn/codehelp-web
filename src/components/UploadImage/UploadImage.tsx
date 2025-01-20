import { FaImages } from 'react-icons/fa'
import { Props } from './types'

const UploadImage = (props: Props) => {
    const { onChange } = props
    return (
        <>
            <label htmlFor="uploadImage">
                <FaImages className="cursor-pointer" />
            </label>
            <input
                id="uploadImage"
                type="file"
                className="hidden"
                onChange={onChange}
            />
        </>
    )
}
export default UploadImage
