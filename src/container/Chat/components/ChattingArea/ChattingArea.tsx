import Image from 'next/image'
import ButtonInput from '../ButtonInput/ButtonInput'
import { fakeList } from './FakeDataFile'
import MessageBox from '../MessageBox/MessageBox'

const ChattingArea = () => {
    const userName = 'teacher3'
    return (
        <div className="flex h-screen min-w-[300px] flex-1 flex-col px-5 py-5">
            <div className="custom-scrollbar mt-5 overflow-x-hidden overflow-y-scroll">
                {fakeList.map((data) => (
                    <>
                        {data.userName === userName ? (
                            <div className="my-3 ml-20 flex justify-end">
                                <MessageBox
                                    key={data.id}
                                    message={data.message}
                                />
                            </div>
                        ) : (
                            <div className="my-3 flex items-center">
                                <Image
                                    className="max-h-12 max-w-12 rounded-full"
                                    src={data.avatar}
                                    alt=""
                                    width="48"
                                    height="48"
                                />
                                <div className="ml-5 mr-3">
                                    <MessageBox
                                        key={data.id}
                                        message={data.message}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
            <div className="flex justify-center pr-3">
                <ButtonInput maxRows={17} placeholder="Write something..." />
            </div>
        </div>
    )
}

export default ChattingArea
