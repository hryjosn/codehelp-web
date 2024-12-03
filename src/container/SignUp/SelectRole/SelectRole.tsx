'use client'
import { observer } from 'mobx-react-lite'
import LinkText from '../components/LinkText/LinkText'
import { useRouter } from 'next/navigation'

const SelectRole = () => {
    const router = useRouter()
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="flex flex-col gap-10 rounded-xl p-10 shadow-lg">
                <div className="text-3xl font-bold">
                    Welcome to Codehelp!
                    <p>What brings you to the community?</p>
                </div>
                <LinkText href={'/signup/mentor-signup'}>
                    <div className="rounded-xl px-20 py-10 shadow-lg">
                        GO TO MENTOR
                    </div>
                </LinkText>
                <LinkText href={'/signup/member-signup'}>
                    <div className="rounded-xl px-20 py-10 shadow-lg">
                        GO TO MEMBER
                    </div>
                </LinkText>
            </div>
            <button
                type="button"
                className="mt-10 font-bold"
                onClick={() => {
                    router.back()
                }}
            >
                {'< back'}
            </button>
        </div>
    )
}
export default observer(SelectRole)
