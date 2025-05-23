'use client'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { TabsContent } from '~/components/ui/tabs'
import { useEditMemberProfileModalStore } from '../EditMemberProfileModal/store/EditMemberProfileModalStore'
import { inputChange } from '~/container/UserProfile/MemberPage/utils'

const ContactInfoTab = () => {
    const { newMemberInfo } = useEditMemberProfileModalStore()

    return (
        <TabsContent value="contact" className="mt-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={newMemberInfo.phoneNumber || ''}
                    onChange={inputChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                    id="company"
                    name="company"
                    value={newMemberInfo.company || ''}
                    onChange={inputChange}
                />
            </div>
        </TabsContent>
    )
}

export default ContactInfoTab
