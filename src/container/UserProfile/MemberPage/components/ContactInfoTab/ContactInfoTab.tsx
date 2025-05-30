'use client'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { TabsContent } from '~/components/ui/tabs'
import { useEditMemberProfileModalStore } from '../EditMemberProfileModal/store/EditMemberProfileModalStore'
import { inputChange } from '~/container/UserProfile/MemberPage/utils'
import { CountryData } from 'react-phone-input-2'
import PhoneNumberInput from '~/container/UserProfile/components/PhoneNumberInput/PhoneNumberInput'

const ContactInfoTab = () => {
    const { newMemberInfo, setCountryCode, setPhoneNumber } =
        useEditMemberProfileModalStore()

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
                    phoneNumber={newMemberInfo.phoneNumber}
                    onChange={phoneChange}
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
