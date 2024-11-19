import Image from 'next/image'
import MessageBox from '../MessageBox/MessageBox'
import { useChatroomStore } from '../../store/ChatStore'
import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { IoSend } from 'react-icons/io5'
const ChattingArea = () => {
    const [content, setContent] = useState('')
    const getChatroomInfo = useChatroomStore((state) => state.getChatroomInfo)
    const createMessage = useChatroomStore((state) => state.createMessage)
    const chatroomInfo = useChatroomStore((state) => state.chatroomInfo)
    useEffect(() => {
        getChatroomInfo('a1b04991-a6b0-4fc1-bbbb-2e099e99680f')
    }, [getChatroomInfo])

    return (
        <div className="flex h-screen min-w-[300px] flex-1 flex-col px-5 py-5">
            <div className="custom-scrollbar mt-5 flex-1 overflow-x-hidden overflow-y-scroll">
                {chatroomInfo.messages.map((data) => (
                    <div key={data.id}>
                        {chatroomInfo.member.id === data.userId ? (
                            <div className="my-3 ml-20 flex justify-end">
                                <MessageBox
                                    key={data.id}
                                    message={data.content}
                                />
                            </div>
                        ) : (
                            <div className="my-3 flex items-center">
                                <Image
                                    className="max-h-12 max-w-12 rounded-full"
                                    src={chatroomInfo.mentor.avatar}
                                    alt=""
                                    width="48"
                                    height="48"
                                />
                                <div className="ml-5 mr-3">
                                    <MessageBox
                                        key={data.id}
                                        message={data.content}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center pr-3">
                <div className="flex min-w-[200px] flex-1 items-center rounded-lg bg-gray-100 px-3">
                    <TextareaAutosize
                        className="ml-3 w-full resize-none bg-transparent py-3 font-bold outline-none"
                        maxRows={17}
                        placeholder="Write something..."
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    />
                    <button
                        className="rounded-full p-2 hover:bg-gray-200"
                        onClick={() => {
                            createMessage(
                                content,
                                'a1b04991-a6b0-4fc1-bbbb-2e099e99680f'
                            )
                            setContent('')
                        }}
                    >
                        <IoSend className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChattingArea
