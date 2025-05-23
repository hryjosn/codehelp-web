'use client'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { TabsContent } from '~/components/ui/tabs'
import educationList from '~/constant/data/education.json'
import countryList from '~/constant/data/countries.json'
import UploadAvatar from '~/container/UserProfile/MentorPage/components/UploadAvatar/UploadAvatar'
import { useEditProfileModalStore } from '../../store/EditProfileModalStore'
import {
    avatarChange,
    educationChange,
    inputChange,
    selectChange,
} from '~/container/UserProfile/MentorPage/utils'

const BasicInfoTab = () => {
    const { newMentorInfo, avatarPreview } = useEditProfileModalStore()

    return (
        <TabsContent value="basic" className="mt-4 space-y-4">
            <div className="mb-4">
                <UploadAvatar
                    userName={newMentorInfo.userName}
                    avatarPreview={avatarPreview}
                    onChange={avatarChange}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                        id="userName"
                        name="userName"
                        value={newMentorInfo.userName || ''}
                        onChange={inputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={newMentorInfo.title || ''}
                        onChange={inputChange}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <RadioGroup
                        value={newMentorInfo.gender || ''}
                        onValueChange={(value) =>
                            selectChange({
                                name: 'gender',
                                value,
                            })
                        }
                        className="flex space-x-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="m" id="male" />
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="f" id="female" />
                            <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="u" id="unknown" />
                            <Label htmlFor="unknown">Unknown</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="level">Experience Level (years)</Label>
                    <Input
                        id="level"
                        name="level"
                        type="number"
                        min="0"
                        max="6"
                        value={newMentorInfo.level || 0}
                        onChange={inputChange}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select
                    value={newMentorInfo.education || ''}
                    onValueChange={educationChange}
                >
                    <SelectTrigger id="educationLevel">
                        <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                        {educationList.map((data) => (
                            <SelectItem key={data.code} value={data.code}>
                                {data.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                    value={newMentorInfo.country || ''}
                    onValueChange={(value) => {
                        selectChange({
                            name: 'country',
                            value,
                        })
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="introduction">Introduction</Label>
                <Textarea
                    id="introduction"
                    name="introduction"
                    value={newMentorInfo.introduction || ''}
                    onChange={inputChange}
                    className="min-h-[100px]"
                    required
                />
            </div>
        </TabsContent>
    )
}

export default BasicInfoTab
