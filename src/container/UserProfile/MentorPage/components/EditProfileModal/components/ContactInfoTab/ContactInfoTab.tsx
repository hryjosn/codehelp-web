'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { TabsContent } from '../ui/tabs'
import { useEditProfileModalStore } from '../../store/EditProfileModalStore'
import { inputChange } from '~/container/UserProfile/MentorPage/utils'

const ContactInfoTab = () => {
    const { newUserInfo } = useEditProfileModalStore()

    return (
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
                <Label htmlFor="phoneNumber">Phone Number</Label>
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
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
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
    )
}

export default ContactInfoTab
