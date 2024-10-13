import { IoSend } from 'react-icons/io5'
import TextareaAutosize from 'react-textarea-autosize'

const ButtonInput = ({ ...props }) => {
    return (
        <div className="flex min-w-[200px] flex-1 items-center rounded-lg bg-gray-100 px-3">
            <TextareaAutosize
                className="ml-3 w-full resize-none bg-transparent py-3 font-bold outline-none"
                {...props}
            />
            <button className="rounded-full p-3 hover:bg-gray-200">
                <IoSend />
            </button>
        </div>
    )
}

export default ButtonInput
