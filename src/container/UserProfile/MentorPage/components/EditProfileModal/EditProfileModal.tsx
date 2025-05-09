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
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Separator } from './components/ui/separator'
import { Props } from './types'
import expertiseList from '~/constant/data/expertise.json'
import { useEditProfileModalStore } from './store/EditProfileModalStore'
import {
    inputChange,
    selectChange,
} from '~/container/UserProfile/MentorPage/utils'
import BasicInfoTab from './components/BasicInfoTab/BasicInfoTab'

export default function EditProfileModal({ profileData, onSave }: Props) {
    const { isOpen, newUserInfo, closeModal, initializeUserInfo } =
        useEditProfileModalStore()

    useEffect(() => {
        initializeUserInfo(profileData)
    }, [initializeUserInfo, profileData])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newUserInfo.primaryExpertise) {
            alert('Primary expertise is required')
            return
        }
        closeModal()
        onSave(newUserInfo)
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

                        <BasicInfoTab />

                        {/* Contact Information Tab */}
                        <TabsContent value="contact" className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={newUserInfo.email || ''}
                                    onChange={inputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={newUserInfo.phoneNumber || ''}
                                    onChange={inputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    value={newUserInfo.company || ''}
                                    onChange={inputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedinUrl">
                                    LinkedIn URL
                                </Label>
                                <Input
                                    id="linkedinUrl"
                                    name="linkedinUrl"
                                    type="url"
                                    value={newUserInfo.url || ''}
                                    onChange={inputChange}
                                    placeholder="https://linkedin.com/"
                                />
                            </div>
                        </TabsContent>

                        {/* Expertise Tab */}
                        <TabsContent
                            value="expertise"
                            className="mt-4 space-y-4"
                        >
                            {/* Primary Expertise */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="primaryExpertise"
                                    className="font-medium"
                                >
                                    Primary Expertise{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={newUserInfo.primaryExpertise || ''}
                                    onValueChange={(value) =>
                                        selectChange({
                                            name: 'primaryExpertise',
                                            value,
                                        })
                                    }
                                    required
                                >
                                    <SelectTrigger id="primaryExpertise">
                                        <SelectValue placeholder="Select primary expertise" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {expertiseList.map((expertise) => (
                                            <SelectItem
                                                key={expertise}
                                                value={expertise}
                                            >
                                                {expertise}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            {/* Secondary Expertise */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="secondaryExpertise"
                                    className="font-medium"
                                >
                                    Secondary Expertise
                                </Label>
                                <Select
                                    value={newUserInfo.secondaryExpertise || ''}
                                    onValueChange={(value) =>
                                        selectChange({
                                            name: 'secondaryExpertise',
                                            value,
                                        })
                                    }
                                >
                                    <SelectTrigger id="secondaryExpertise">
                                        <SelectValue placeholder="Select secondary expertise (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            None
                                        </SelectItem>
                                        {expertiseList
                                            .filter(
                                                (expertise) =>
                                                    expertise !==
                                                        newUserInfo.primaryExpertise &&
                                                    expertise !==
                                                        newUserInfo.tertiaryExpertise
                                            )
                                            .map((expertise) => (
                                                <SelectItem
                                                    key={expertise}
                                                    value={expertise}
                                                >
                                                    {expertise}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            {/* Tertiary Expertise */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="tertiaryExpertise"
                                    className="font-medium"
                                >
                                    Tertiary Expertise
                                </Label>
                                <Select
                                    value={newUserInfo.tertiaryExpertise || ''}
                                    onValueChange={(value) =>
                                        selectChange({
                                            name: 'tertiaryExpertise',
                                            value,
                                        })
                                    }
                                >
                                    <SelectTrigger id="tertiaryExpertise">
                                        <SelectValue placeholder="Select tertiary expertise (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            None
                                        </SelectItem>
                                        {expertiseList
                                            .filter(
                                                (expertise) =>
                                                    expertise !==
                                                        newUserInfo.primaryExpertise &&
                                                    expertise !==
                                                        newUserInfo.secondaryExpertise
                                            )
                                            .map((expertise) => (
                                                <SelectItem
                                                    key={expertise}
                                                    value={expertise}
                                                >
                                                    {expertise}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </TabsContent>
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
