import { callGetUserInfoHandler } from '~/api/user/userAPI'
import TitleSection from './components/TitleSection/TitleSection'
import ChatroomSection from './components/ChatroomSection/ChatroomSection'
import ChattingArea from './components/ChattingArea/ChattingArea'
import DefaultChattingArea from './components/DefaultChattingArea/DefaultChattingArea'

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
    const chatroomId = (await params).id
    const userData = await callGetUserInfoHandler()

    return (
        <div className="flex">
            <div className="flex h-screen w-1/4 min-w-[400px] flex-col border-r px-10 py-5">
                <TitleSection />

                <div className="custom-scrollbar mt-5 overflow-y-scroll">
                    <ChatroomSection
                        chatroomId={chatroomId}
                        userData={userData.user}
                    />
                </div>
            </div>
            {chatroomId ? (
                <ChattingArea
                    chatroomId={chatroomId}
                    userData={userData.user}
                />
            ) : (
                <DefaultChattingArea />
            )}
        </div>
    )
}

export default Chat
