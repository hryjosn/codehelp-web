'use client'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { User, Mail, Phone, MapPin, Building, Edit, Clock } from 'lucide-react'
import Header from '~/components/Header/Header'
import Card from '../components/Card/Card'
import { Props } from './types'
import { UserForMember } from '~/api/user/types'
import { GENDER_LIST, LEVEL_LIST } from '../types'
import EditMemberProfileModal from './components/EditMemberProfileModal/EditMemberProfileModal'
import { useEditMemberProfileModalStore } from './components/EditMemberProfileModal/store/EditMemberProfileModalStore'
import { UpdateMemberInfoData } from '~/api/member/types'
import { useUpdateMemberInfo } from '~/api/member/member'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '~/hooks/use-toast'
import { useUpdateAvatar } from '~/api/user/user'
import { useSession } from 'next-auth/react'
import { refactorPhoneNumber } from '~/lib/utils'

export default function MemberPage({ userData }: Props) {
    const { avatarFile, countryCode, openModal, setInitialInfo } =
        useEditMemberProfileModalStore()
    const { mutate: updateInfo } = useUpdateMemberInfo()
    const { mutateAsync: updateAvatar } = useUpdateAvatar()

    const { update } = useSession()

    const queryClient = useQueryClient()
    const { toast } = useToast()

    const profileUpdate = async (newMemberInfo: UserForMember) => {
        let newPhoneNumber = newMemberInfo.phoneNumber
        if (userData.avatar !== newMemberInfo.avatar && avatarFile) {
            const formData = new FormData()
            formData.append('avatar', avatarFile)
            await updateAvatar(formData)
        }
        if (userData.phoneNumber !== newMemberInfo.phoneNumber) {
            newPhoneNumber = refactorPhoneNumber({
                phoneNumber: newPhoneNumber,
                countryCode,
            })
        }

        const updateData: UpdateMemberInfoData = {
            userName: newMemberInfo.userName,
            gender: newMemberInfo.gender,
            country: newMemberInfo.country,
            title: newMemberInfo.title,
            company: newMemberInfo.company,
            introduction: newMemberInfo.introduction,
            phoneNumber: newPhoneNumber,
            level: newMemberInfo.level,
            fieldOfWork: newMemberInfo.fieldOfWork,
        }

        updateInfo(updateData, {
            onSuccess(res) {
                if (res.status === 'ok') {
                    queryClient.invalidateQueries({
                        queryKey: ['userInfo'],
                    })
                    toast({
                        title: 'Update Successful!',
                        variant: 'hint',
                    })
                    update({ user: { avatar: newMemberInfo.avatar } })
                }
            },
        })
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <div className="mt-2 flex items-center md:mt-0">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => {
                                setInitialInfo(userData)
                                openModal()
                            }}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
                    <Card
                        className="lg:col-span-1"
                        content={
                            <div className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="mb-4 h-24 w-24">
                                        <AvatarImage
                                            src={String(userData.avatar)}
                                            alt={userData.userName}
                                        />
                                        <AvatarFallback>
                                            {userData.userName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-semibold">
                                        {userData.userName}
                                    </h2>
                                    <div className="mt-2 flex items-center text-muted-foreground">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        <span>{userData.country}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3">
                                    <div className="flex items-center text-sm">
                                        <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>{userData.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>{userData.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Building className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>{userData.company}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <User className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>
                                            {GENDER_LIST[userData.gender]}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>
                                            {LEVEL_LIST[userData.level]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <Card
                        className="lg:col-span-3"
                        headerTitle="About Me"
                        content={<p>{userData.introduction}</p>}
                    />
                </div>

                {/* Work Section */}
                <Card
                    className="mb-6"
                    headerTitle="Work Experience"
                    isButtonVisible
                    onClick={() => {}}
                    content={
                        <div className="flex flex-wrap gap-2">
                            {userData.fieldOfWork.map(
                                (work: string, index: number) => (
                                    <Badge key={index} variant="secondary">
                                        {work}
                                    </Badge>
                                )
                            )}
                        </div>
                    }
                />
            </div>
            <EditMemberProfileModal onSave={profileUpdate} />
        </div>
    )
}
