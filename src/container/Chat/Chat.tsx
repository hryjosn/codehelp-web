'use client'
import { observer } from 'mobx-react-lite'
import SearchInput from '~/components/SearchInput/SearchInput'
import Chatroom from './components/Chatroom/Chatroom'
import ChattingArea from './components/ChattingArea/ChattingArea'
import { useMemo, useState } from 'react'
import { useGetChatroomList } from '~/api/chatroom/chatroom'

const Chat = ({ params }: { params: Promise<{ id: string }> }) => {
    const [searchingValue, setSearchingValue] = useState('') //temporary
    const { data: chatroomListData } = useGetChatroomList()
    const chatroomList = useMemo(() => {
        const queriedChatroom = chatroomListData?.pages.flatMap(
            (page) => page.chatroomList
        )
        return queriedChatroom
    }, [chatroomListData])

    return (
        <div className="flex">
            <div className="flex h-screen w-1/4 min-w-[400px] flex-col border-r px-10 py-5">
                <p className="text-xl font-bold">Messages</p>
                <div className="mt-5">
                    <SearchInput
                        placeholder="Search Members"
                        value={searchingValue}
                        onChange={(e) => {
                            setSearchingValue(e.target.value)
                        }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            setSearchingValue('')
                        }}
                    />
                </div>
                <div className="custom-scrollbar mt-5 overflow-y-scroll">
                    {chatroomList &&
                        chatroomList.map((data) => (
                            <Chatroom
                                key={data.id}
                                id={data.id}
                                userName={data.mentor.userName}
                                avatar={data.mentor.avatar}
                            />
                        ))}
                </div>
            </div>
            <ChattingArea />
        </div>
    )
}

export default observer(Chat)
