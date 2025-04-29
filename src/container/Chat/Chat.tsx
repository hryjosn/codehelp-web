import ChattingArea from './components/ChattingArea/ChattingArea'
import SearchInputSection from './components/SearchInputSection/SearchInputSection'
import ChatroomSection from './components/ChatroomSection/ChatroomSection'
import DefaultChattingArea from './components/DefaultChattingArea/DefaultChattingArea'
import BackButton from '~/components/BackButton/BackButton'

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
    const chatroomId = (await params).id

    return (
        <div className="flex">
            <div className="flex h-screen w-1/4 min-w-[400px] flex-col border-r px-10 py-5">
                <div className="flex">
                    <div className="mr-3 flex items-center">
                        <BackButton />
                    </div>
                    <p className="text-xl font-bold">Messages</p>
                </div>

                <div className="mt-5">
                    <SearchInputSection />
                </div>
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
