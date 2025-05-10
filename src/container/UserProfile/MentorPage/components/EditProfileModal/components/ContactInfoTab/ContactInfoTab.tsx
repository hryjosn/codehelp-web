'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { TabsContent } from '../ui/tabs'
import { Switch } from '../ui/switch'
import { useEditProfileModalStore } from '../../store/EditProfileModalStore'
import {
    inputChange,
    selectChange,
} from '~/container/UserProfile/MentorPage/utils'

const ContactInfoTab = () => {
    const { newMentorInfo } = useEditProfileModalStore()

    return (
        <TabsContent value="contact" className="mt-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newMentorInfo.email || ''}
                    onChange={inputChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={newMentorInfo.phoneNumber || ''}
                    onChange={inputChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                    id="company"
                    name="company"
                    value={newMentorInfo.company || ''}
                    onChange={inputChange}
                />
            </div>

            <div className="flex items-center justify-between space-y-0 pt-2">
                <Label htmlFor="quickReply">Quick Reply</Label>
                <Switch
                    id="quickReply"
                    checked={!!newMentorInfo.quickReply}
                    onCheckedChange={(checked) =>
                        selectChange({ name: 'quickReply', value: checked })
                    }
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    value={newMentorInfo.url || ''}
                    onChange={inputChange}
                    placeholder="https://linkedin.com/"
                />
            </div>
        </TabsContent>
    )
}

export default ContactInfoTab
