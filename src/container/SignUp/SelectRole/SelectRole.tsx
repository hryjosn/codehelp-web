'use client'
import { observer } from 'mobx-react-lite'
import LinkText from '../components/LinkText/LinkText'

const SelectRole = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg gap-10 p-10 rounded-xl">
                <div className="text-3xl font-bold">
                    Welcome to Codehelp!
                    <p>What brings you to the community?</p>
                </div>
                <LinkText href={'/signup/mentor/step1'}>
                    <div className="px-20 py-10 shadow-lg rounded-xl">
                        GO TO MENTOR
                    </div>
                </LinkText>
                <LinkText href={'/signup/member/step1'}>
                    <div className="px-20 py-10 shadow-lg rounded-xl">
                        GO TO MEMBER
                    </div>
                </LinkText>
            </div>
        </div>
    )
}
export default observer(SelectRole)
