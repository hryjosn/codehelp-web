'use client'

import { Modal } from '@mui/material'
import { useEditBookingInfoModalStore } from './store/EditBookingInfoModalStore'
import Input from '~/components/Input/Input'
import { Button } from '~/components/Button/Button'

interface EditBookingModalProps {
    data: { topic: string; host: string; startAt: string; memberList: string[] }
}

const EditBookingInfoModal = ({ data }: EditBookingModalProps) => {
    const { isOpen, closeModal } = useEditBookingInfoModalStore()
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 19)
    }
    return (
        <Modal open={isOpen} onClose={closeModal}>
            <div className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                <div className="text-lg font-bold">Booking Information</div>
                <div className="mb-2 text-gray-500">
                    Below is your booking information.
                </div>

                <Input margin="normal" value={data.topic} />
                <Input margin="normal" value={data.host} />
                <Input margin="normal" value={data.memberList.join(', ')} />
                <Input
                    type="datetime-local"
                    margin="normal"
                    value={formatDateForInput(data.startAt)}
                />

                <div className="mt-4 flex justify-between">
                    <Button onClick={closeModal} variant="primary">
                        Close
                    </Button>
                    <Button>Save</Button>
                </div>
            </div>
        </Modal>
    )
}

export default EditBookingInfoModal
