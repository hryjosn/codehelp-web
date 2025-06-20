'use client'
import { observer } from 'mobx-react-lite'
import LinkText from '../components/LinkText/LinkText'
import { useRouter } from '~/i18n/routing'

const SelectRole = () => {
    const router = useRouter()
    return (
        <div className="flex h-full flex-col items-center justify-center mx-5 md:m-0">
            <div className="flex flex-col gap-10 rounded-xl p-8 shadow-lg bg-white md:bg-none md:p-10">
                <div className="text-2xl font-bold md:text-3x1">
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
                className="mt-10 text-white text-2xl md:font-bold md:text-base md:text-black "
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
