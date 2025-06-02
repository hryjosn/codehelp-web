import ChattingArea from './components/ChattingArea/ChattingArea'
import ChatroomSection from './components/ChatroomSection/ChatroomSection'
import DefaultChattingArea from './components/DefaultChattingArea/DefaultChattingArea'
import TitleSection from './components/TitleSection/TitleSection'

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
    const chatroomId = (await params).id

    return (
        <div className="flex">
            <div className="flex h-screen w-1/4 min-w-[400px] flex-col border-r px-10 py-5">
                <TitleSection />

                <div className="custom-scrollbar mt-5 overflow-y-scroll">
                    <ChatroomSection chatroomId={chatroomId} />
                </div>
            </div>
            {chatroomId ? (
                <ChattingArea chatroomId={chatroomId} />
            ) : (
                <DefaultChattingArea />
            )}
        </div>
    )
}

export default Chat
