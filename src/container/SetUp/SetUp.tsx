import { observer } from 'mobx-react-lite'
import Link from 'next/link'

const SetUp = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg gap-10 p-10 rounded-xl">
                <div className="text-3xl font-bold">
                    Welcome to Codehelp!
                    <p>What brings you to the community?</p>
                </div>

                <Link href={'./setup/mentor/step1'}>
                    <div className="px-20 py-10 shadow-lg rounded-xl">
                        GO TO MENTOR
                    </div>
                </Link>
                <Link href={'./setup/student/step1'}>
                    <div className="px-20 py-10 shadow-lg rounded-xl">
                        GO TO STUDENT
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default observer(SetUp)
