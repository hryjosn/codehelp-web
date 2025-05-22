'use client'

import { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '~/container/UserProfile/components/dialog'
import { Button } from '~/container/UserProfile/components/button'
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '~/container/UserProfile/components/tabs'
import { Props } from './types'
import { useEditMemberProfileModalStore } from './store/EditMemberProfileModalStore'
import BasicInfoTab from '../BasicInfoTab/BasicInfoTab'
import ContactInfoTab from '../ContactInfoTab/ContactInfoTab'

export default function EditMemberProfileModal({ onSave }: Props) {
    const { isOpen, newMemberInfo, closeModal } =
        useEditMemberProfileModalStore()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        closeModal()
        onSave(newMemberInfo)
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                        </TabsList>

                        {/* Basic Information Tab */}
                        <BasicInfoTab />

                        {/* Contact Information Tab */}
                        <ContactInfoTab />
                    </Tabs>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
