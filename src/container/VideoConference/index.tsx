import VideoConferenceSection from './components/VideoConferenceSection/VideoConferenceSection'
import { callGetUserInfoHandler } from '~/api/user/userAPI'

const VideoConference = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const roomId = (await params).id
    const userData = await callGetUserInfoHandler()

    return <VideoConferenceSection roomId={roomId} userData={userData.user} />
}
export default VideoConference
