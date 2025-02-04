import { IoSend } from 'react-icons/io5'
import TextareaAutosize from 'react-textarea-autosize'
import { Props } from './types'

const ButtonInput = ({ onClick, ...props }: Props) => {
    return (
        <div className="flex min-w-[200px] flex-1 items-center rounded-lg bg-gray-100 px-3">
            <TextareaAutosize
                className="ml-3 w-full resize-none bg-transparent py-3 font-bold outline-none"
                {...props}
            />
            <button
                className="rounded-full p-2 hover:bg-gray-200"
                onClick={onClick}
            >
                <IoSend className="h-6 w-6" />
            </button>
        </div>
    )
}

export default ButtonInput
