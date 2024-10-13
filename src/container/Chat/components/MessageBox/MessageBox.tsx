const MessageBox = ({ message }: { message: string }) => {
    return (
        <div className="max-w-[500px] break-words rounded-lg bg-gray-200 px-3 py-3 text-base">
            {message}
        </div>
    )
}
export default MessageBox
