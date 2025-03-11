import Image from 'next/image'
import MessageBox from '../MessageBox/MessageBox'
import { useChatroomStore } from '../../store/ChatStore'
import { useEffect, useState } from 'react'
import ButtonInput from '~/components/ButtonInput/ButtonInput'

const ChattingArea = () => {
    const [content, setContent] = useState('')
    const getChatroomInfo = useChatroomStore((state) => state.getChatroomInfo)
    const createMessage = useChatroomStore((state) => state.createMessage)
    const chatroomInfo = useChatroomStore((state) => state.chatroomInfo)
    const chatroomId = useChatroomStore((state) => state.chatroomId)
    useEffect(() => {
        getChatroomInfo(chatroomId)
    }, [getChatroomInfo])

    return (
        <div className="flex h-screen min-w-[300px] flex-1 flex-col px-5 py-5">
            <div className="custom-scrollbar mt-5 flex-1 overflow-x-hidden overflow-y-scroll">
                {chatroomInfo?.messages &&
                    chatroomInfo.messages.map((data) => (
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
                <ButtonInput
                    maxRows={17}
                    placeholder="Write something..."
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    onClick={() => {
                        createMessage({ content, chatroomId })
                        setContent('')
                    }}
                />
            </div>
        </div>
    )
}

export default ChattingArea
