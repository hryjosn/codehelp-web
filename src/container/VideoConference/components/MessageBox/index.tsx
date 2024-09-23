interface MessageBoxT {
    name: string
    time: string
    message: string
}
const MessageBox = ({ name, time, message }: MessageBoxT) => {
    return (
        <div className="flex flex-col gap-1 text-sm">
            <div className="flex gap-1">
                <p className="font-bold">{name}</p>
                <p>{time}</p>
            </div>
            <p className="break-words">{message}</p>
        </div>
    )
}
export default MessageBox
