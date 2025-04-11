'use client'
import { Modal } from '@mui/material'
import { useImageModalStore } from './store/ImageModalStore'
import Image from 'next/image'

const ImageModal = () => {
    const { isOpen, imageURL, closeModal } = useImageModalStore()

    return (
        <Modal open={isOpen} onClose={closeModal}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
                {imageURL && (
                    <Image
                        className="h-full w-full object-cover"
                        src={imageURL}
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                    />
                )}
            </div>
        </Modal>
    )
}

export default ImageModal
