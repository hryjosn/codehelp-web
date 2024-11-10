'use client'
import { observer } from 'mobx-react-lite'
import SearchInput from './components/SearchInput/SearchInput'
import Chatroom from './components/Chatroom/Chatroom'
import ChattingArea from './components/ChattingArea/ChattingArea'

const fakeData = [
    { id: '1', userName: 'teacher1', avatar: '/MentorList/mentor_1.jpg' },
    { id: '2', userName: 'teacher2', avatar: '/MentorList/mentor_3.jpg' },
    { id: '3', userName: 'teacher3', avatar: '/MentorList/mentor_5.jpg' },
    { id: '4', userName: 'teacher1', avatar: '/MentorList/mentor_1.jpg' },
    { id: '5', userName: 'teacher2', avatar: '/MentorList/mentor_3.jpg' },
    { id: '6', userName: 'teacher3', avatar: '/MentorList/mentor_5.jpg' },
    { id: '7', userName: 'teacher1', avatar: '/MentorList/mentor_1.jpg' },
    { id: '8', userName: 'teacher2', avatar: '/MentorList/mentor_3.jpg' },
    { id: '9', userName: 'teacher3', avatar: '/MentorList/mentor_5.jpg' },
    { id: '10', userName: 'teacher1', avatar: '/MentorList/mentor_1.jpg' },
    { id: '11', userName: 'teacher2', avatar: '/MentorList/mentor_3.jpg' },
    { id: '12', userName: 'teacher3', avatar: '/MentorList/mentor_5.jpg' },
    { id: '13', userName: 'teacher1', avatar: '/MentorList/mentor_1.jpg' },
    { id: '14', userName: 'teacher2', avatar: '/MentorList/mentor_3.jpg' },
    { id: '15', userName: 'teacher3', avatar: '/MentorList/mentor_5.jpg' },
]
const Chat = () => {
    return (
        <div className="flex">
            <div className="flex h-screen w-1/4 min-w-[400px] flex-col border-r px-10 py-5">
                <p className="text-xl font-bold">Messages</p>
                <div className="mt-5">
                    <SearchInput placeholder="Search Members" />
                </div>
                <div className="custom-scrollbar mt-5 overflow-y-scroll">
                    {fakeData.map((data) => (
                        <Chatroom
                            key={data.id}
                            id={data.id}
                            userName={data.userName}
                            avatar={data.avatar}
                        />
                    ))}
                </div>
            </div>
            <ChattingArea />
        </div>
    )
}

export default observer(Chat)