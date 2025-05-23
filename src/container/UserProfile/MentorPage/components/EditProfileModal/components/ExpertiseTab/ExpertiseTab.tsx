'use client'

import { SelectItem } from '~/components/ui/select'
import { TabsContent } from '~/components/ui/tabs'
import expertiseList from '~/constant/data/expertise.json'
import { useEditProfileModalStore } from '../../store/EditProfileModalStore'
import { selectChange } from '~/container/UserProfile/MentorPage/utils'
import ExpertiseDropDown from '../ExpertiseDropDown/ExpertiseDropDown'

const ExpertiseTab = () => {
    const { newMentorInfo } = useEditProfileModalStore()

    return (
        <TabsContent value="expertise" className="mt-4 space-y-6">
            {/* Primary Expertise */}
            <ExpertiseDropDown
                title="Primary Expertise"
                htmlFor="primaryExpertise"
                value={newMentorInfo.primaryExpertise}
                onValueChange={(value) =>
                    selectChange({
                        name: 'primaryExpertise',
                        value,
                    })
                }
                required
                placeholder="Select primary expertise"
                content={
                    <>
                        {expertiseList.map((expertise) => (
                            <SelectItem key={expertise} value={expertise}>
                                {expertise}
                            </SelectItem>
                        ))}
                    </>
                }
            />

            {/* Secondary Expertise */}

            <ExpertiseDropDown
                title="Secondary Expertise"
                htmlFor="secondaryExpertise"
                value={newMentorInfo.secondaryExpertise}
                onValueChange={(value) =>
                    selectChange({
                        name: 'secondaryExpertise',
                        value,
                    })
                }
                placeholder="Select secondary expertise (optional)"
                content={
                    <>
                        <SelectItem value="none">None</SelectItem>
                        {expertiseList
                            .filter(
                                (expertise) =>
                                    expertise !==
                                        newMentorInfo.primaryExpertise &&
                                    expertise !==
                                        newMentorInfo.tertiaryExpertise
                            )
                            .map((expertise) => (
                                <SelectItem key={expertise} value={expertise}>
                                    {expertise}
                                </SelectItem>
                            ))}
                    </>
                }
            />

            {/* Tertiary Expertise */}
            <ExpertiseDropDown
                title="Tertiary Expertise"
                htmlFor="tertiaryExpertise"
                value={newMentorInfo.tertiaryExpertise}
                onValueChange={(value) =>
                    selectChange({
                        name: 'tertiaryExpertise',
                        value,
                    })
                }
                placeholder="Select tertiary expertise (optional)"
                content={
                    <>
                        <SelectItem value="none">None</SelectItem>
                        {expertiseList
                            .filter(
                                (expertise) =>
                                    expertise !==
                                        newMentorInfo.primaryExpertise &&
                                    expertise !==
                                        newMentorInfo.secondaryExpertise
                            )
                            .map((expertise) => (
                                <SelectItem key={expertise} value={expertise}>
                                    {expertise}
                                </SelectItem>
                            ))}
                    </>
                }
            />
        </TabsContent>
    )
}

export default ExpertiseTab
