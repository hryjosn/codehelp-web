import { Props } from './types'

const MessageBox = ({ message }: Props) => {
    return (
        <div className="max-w-[500px] break-words rounded-lg bg-gray-200 px-3 py-3 text-base">
            {message}
        </div>
    )
}
export default MessageBox
