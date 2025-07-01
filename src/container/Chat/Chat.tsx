import { callGetUserInfoHandler } from '~/api/user/userAPI'

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
    const chatroomId = (await params).id
    const data = await callGetUserInfoHandler()
    console.log('Chat data>', data)
    return (
        <div className="flex">
            {/* <div className="flex h-screen w-1/4 min-w-[400px] flex-col border-r px-10 py-5">
                <TitleSection />

                <div className="custom-scrollbar mt-5 overflow-y-scroll">
                    <ChatroomSection chatroomId={chatroomId} />
                </div>
            </div>
            {chatroomId ? (
                <ChattingArea chatroomId={chatroomId} />
            ) : (
                <DefaultChattingArea />
            )} */}
        </div>
    )
}

export default Chat
