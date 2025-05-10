'use client'

import { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from './components/ui/dialog'
import { Button } from './components/ui/button'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import { Props } from './types'
import { useEditProfileModalStore } from './store/EditProfileModalStore'
import BasicInfoTab from './components/BasicInfoTab/BasicInfoTab'
import ContactInfoTab from './components/ContactInfoTab/ContactInfoTab'
import ExpertiseTab from './components/ExpertiseTab/ExpertiseTab'

export default function EditProfileModal({ profileData, onSave }: Props) {
    const { isOpen, newMentorInfo, closeModal, initializeUserInfo } =
        useEditProfileModalStore()

    useEffect(() => {
        initializeUserInfo(profileData)
    }, [initializeUserInfo, profileData])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newMentorInfo.primaryExpertise) {
            alert('Primary expertise is required')
            return
        }
        closeModal()
        onSave(newMentorInfo)
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                            <TabsTrigger value="expertise">
                                Expertise
                            </TabsTrigger>
                        </TabsList>

                        {/* Basic Information Tab */}
                        <BasicInfoTab />

                        {/* Contact Information Tab */}
                        <ContactInfoTab />

                        {/* Expertise Tab */}
                        <ExpertiseTab />
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
