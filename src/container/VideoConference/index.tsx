'use client'
import { useState } from 'react'
import Button from './components/Button'
import MessageBox from './components/MessageBox'

const VideoConference = () => {
    const [isMicOpen, setIsMicOpen] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const MOCK_MESSAGE_LIST = [
        {
            name: 'user1',
            time: '下午1:00',
            message:
                'hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi',
        },
        { name: 'user2', time: '下午1:01', message: 'hello' },
        { name: 'user1', time: '下午1:10', message: 'hi' },
        { name: 'user2', time: '下午1:11', message: 'hello' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user2', time: '下午1:01', message: 'hello' },
        { name: 'user1', time: '下午1:10', message: 'hi' },
        { name: 'user2', time: '下午1:11', message: 'hello' },
    ]
    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex flex-1 gap-3 px-5 pt-5">
                    <video
                        autoPlay
                        className="h-full w-1/2 rounded-3xl border-2 border-white"
                    >
                        user1
                    </video>
                    <video
                        autoPlay
                        muted
                        className="h-full w-1/2 rounded-3xl border-2 border-white"
                    >
                        user2
                    </video>
                </div>
                {isChatOpen && (
                    <div className="mr-5 mt-5 flex w-96 flex-col justify-between gap-2 rounded-lg bg-white p-5 pt-2">
                        <button
                            className="text-end font-bold"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            X
                        </button>
                        <div className="custom-scrollbar flex shrink grow basis-0 flex-col gap-2 overflow-y-scroll">
                            {MOCK_MESSAGE_LIST.map((data, index) => (
                                <MessageBox
                                    name={data.name}
                                    time={data.time}
                                    message={data.message}
                                    key={index}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2 rounded-full border-2 bg-slate-50 px-3">
                            <textarea
                                className="custom-scrollbar flex-1 resize-none break-words border-0 bg-slate-50 py-2 outline-none"
                                rows={1}
                            />
                            <Button src={'/VideoConference/send.png'} />
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-5 flex h-20 justify-center gap-10">
                <Button
                    src={
                        isMicOpen
                            ? '/VideoConference/microphone.png'
                            : '/VideoConference/mute.png'
                    }
                    variant={isMicOpen ? 'grayRound' : 'redRound'}
                    onClick={() => setIsMicOpen(!isMicOpen)}
                />
                <Button
                    src={'/VideoConference/share_screen.png'}
                    variant={'grayRound'}
                />
                <Button
                    src={'/VideoConference/chat.png'}
                    variant={'grayRound'}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                />
                <Button
                    src={'/VideoConference/hang_up.png'}
                    variant={'redRound'}
                />
            </div>
        </div>
    )
}
export default VideoConference
