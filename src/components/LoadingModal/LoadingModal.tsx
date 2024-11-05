import React from 'react'
import { Modal } from '@mui/material'
import { LoadingModalPropsT } from './types'
import Loading from '~/../public/Lottie/loading.json'
import Lottie from 'lottie-react'

const LoadingModal = (props: LoadingModalPropsT) => {
    const { visible } = props
    return (
        <Modal open={visible} className="flex items-center justify-center">
            <div className="shadow-base rounded-lg bg-gray-200 outline-none">
                <Lottie className="h-24 w-24" animationData={Loading} />
            </div>
        </Modal>
    )
}

export default LoadingModal
