'use client'

import { Input } from '~/container/UserProfile/components/input'
import { Label } from '~/container/UserProfile/components/label'
import { Textarea } from '~/container/UserProfile/components/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/container/UserProfile/components/select'
import {
    RadioGroup,
    RadioGroupItem,
} from '~/container/UserProfile/components/radio-group'
import { TabsContent } from '~/container/UserProfile/components/tabs'
import countryList from '~/constant/data/countries.json'
import UploadAvatar from '~/container/UserProfile/MentorPage/components/UploadAvatar/UploadAvatar'
import { useEditMemberProfileModalStore } from '../EditMemberProfileModal/store/EditMemberProfileModalStore'
import {
    avatarChange,
    inputChange,
    selectChange,
} from '~/container/UserProfile/MemberPage/utils'
import levelList from '~/constant/data/level.json'

const BasicInfoTab = () => {
    const { newMemberInfo } = useEditMemberProfileModalStore()

    return (
        <TabsContent value="basic" className="mt-4 space-y-4">
            <div className="mb-4">
                <UploadAvatar
                    userName={newMemberInfo.userName}
                    avatarPreview={newMemberInfo.avatar}
                    onChange={avatarChange}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                        id="userName"
                        name="userName"
                        value={newMemberInfo.userName || ''}
                        onChange={inputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={newMemberInfo.title || ''}
                        onChange={inputChange}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <RadioGroup
                        value={newMemberInfo.gender || ''}
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
                    <Label htmlFor="level">Experience Level</Label>
                    <Select
                        value={String(newMemberInfo.level) || ''}
                        onValueChange={(value) => {
                            selectChange({
                                name: 'level',
                                value,
                            })
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        <SelectContent>
                            {levelList.map((level) => (
                                <SelectItem key={level.code} value={level.code}>
                                    {level.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                    value={newMemberInfo.country || ''}
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
                    value={newMemberInfo.introduction || ''}
                    onChange={inputChange}
                    className="min-h-[100px]"
                    required
                />
            </div>
        </TabsContent>
    )
}

export default BasicInfoTab
