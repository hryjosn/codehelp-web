'use client'

import ChatIcon from '../ChatIcon/ChatIcon'
import PhoneIcon from '../PhoneIcon/PhoneIcon'
import { useSession } from 'next-auth/react'
import { Props } from './types'

const CommunicationSection = ({ mentorId }: Props) => {
    const { data: session, status } = useSession()

    return (
        <>
            {status === 'authenticated' && (
                <>
                    {session.user.identity === 'member' && (
                        <ChatIcon mentorId={mentorId} />
                    )}
                    <PhoneIcon mentorId={mentorId} />
                </>
            )}
        </>
    )
}

export default CommunicationSection
