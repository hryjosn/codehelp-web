'use client'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { TabsContent } from '~/components/ui/tabs'
import { Switch } from '~/components/ui/switch'
import { useEditProfileModalStore } from '../../store/EditProfileModalStore'
import {
    inputChange,
    selectChange,
} from '~/container/UserProfile/MentorPage/utils'
import { CountryData } from 'react-phone-input-2'
import PhoneNumberInput from '~/container/UserProfile/components/PhoneNumberInput/PhoneNumberInput'

const ContactInfoTab = () => {
    const { newMentorInfo, setPhoneNumber, setCountryCode } =
        useEditProfileModalStore()

    const phoneChange = (value: string, data: CountryData) => {
        setCountryCode(`${data.dialCode}`)
        setPhoneNumber(value)
    }

    return (
        <TabsContent value="contact" className="mt-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <PhoneNumberInput
                    initialCountry="tw"
                    phoneNumber={newMentorInfo.phoneNumber}
                    onChange={phoneChange}
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
                    name="url"
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
