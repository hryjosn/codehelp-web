import { Metadata } from 'next'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: roomId } = await params

    return {
        title: roomId,
    }
}

export { default } from '~/container/VideoConference'
