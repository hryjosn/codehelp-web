'use client'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}>
            <IoArrowBackOutline size={20} />
        </button>
    )
}
export default BackButton
