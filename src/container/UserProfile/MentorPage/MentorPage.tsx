'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Separator } from '../components/separator'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Edit,
    Clock,
    Award,
    Briefcase,
    GraduationCap,
    Link,
} from 'lucide-react'
import { Discipline, EDUCATION, Props, Skill, Tool, WEEK_DAYS } from './types'
import Header from '~/components/Header/Header'
import Card from '../components/Card/Card'
import { GENDER_LIST, LEVEL_LIST } from '../types'
import { useGetBookingRecordList } from '~/api/booking/booking'
import { useUpdateMentorInfo } from '~/api/mentor/mentor'
import { useEffect, useMemo, useState } from 'react'
import AppointmentButton from './components/AppointmentButton/AppointmentButton'
import { useAppointmentModalStore } from './components/AppointmentModal/store/AppointmentModalStore'
import { useEditProfileModalStore } from './components/EditProfileModal/store/EditProfileModalStore'
import { useInView } from 'react-intersection-observer'
import AppointmentModal from './components/AppointmentModal/AppointmentModal'
import ImageModal from './components/ImageModal/ImageModal'
import EditProfileModal from './components/EditProfileModal/EditProfileModal'
import { UpdateMentorInfoData } from '~/api/mentor/types'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '~/hooks/use-toast'
import { timeCodeList } from './constants'
import Square from './components/Square/Square'

// This would typically come from an API or database
const mentorData = {
    experience: [
        {
            role: 'Lead Software Architect',
            company: 'TechInnovate Solutions',
            period: '2018 - Present',
            description:
                'Leading architecture decisions for enterprise applications, mentoring junior developers, and implementing best practices across teams.',
        },
        {
            role: 'Senior Developer',
            company: 'Global Systems Inc.',
            period: '2012 - 2018',
            description:
                'Developed scalable backend solutions and led a team of 5 developers on critical projects.',
        },
        {
            role: 'Software Engineer',
            company: 'StartUp Ventures',
            period: '2008 - 2012',
            description:
                'Full-stack development for various client projects using JavaScript, Python, and Ruby.',
        },
    ],
}

export default function MentorPage({ userData }: Props) {
    const {
        data: bookingRecordListData,
        hasNextPage,
        fetchNextPage,
    } = useGetBookingRecordList()
    const { mutate: updateInfo } = useUpdateMentorInfo()

    const { openModal: openAppointmentModal } = useAppointmentModalStore()
    const { openModal: openEditProfileModal, newMentorInfo } =
        useEditProfileModalStore()

    const [bookingId, setBookingId] = useState('')

    const queryClient = useQueryClient()

    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    const { toast } = useToast()

    const bookingRecordList = useMemo(() => {
        return bookingRecordListData?.pages.flatMap(
            (page) => page.bookingRecords
        )
    }, [bookingRecordListData])

    const profileUpdate = () => {
        const updateData: UpdateMentorInfoData = {
            userName: newMentorInfo.userName,
            gender: newMentorInfo.gender,
            country: newMentorInfo.country,
            title: newMentorInfo.title,
            company: newMentorInfo.company,
            introduction: newMentorInfo.introduction,
            phoneNumber: newMentorInfo.phoneNumber,
            level: newMentorInfo.level,
            linkedInURL: newMentorInfo.url,
            primaryExpertise: newMentorInfo.primaryExpertise,
            secondaryExpertise: newMentorInfo.secondaryExpertise,
            tertiaryExpertise: newMentorInfo.tertiaryExpertise,
            education: newMentorInfo.education,
            quickReply: newMentorInfo.quickReply,
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
                }
            },
        })
    }

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

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
                            onClick={openEditProfileModal}
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
                                            src={userData.avatar}
                                            alt={userData.userName}
                                        />
                                        <AvatarFallback>
                                            {userData.userName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-semibold">
                                        {userData.userName}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {userData.primaryExpertise}
                                    </p>
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
                                    <div className="flex items-center text-sm">
                                        <Link className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>{userData.url}</span>
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

                {/* Stats and Availability Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card
                        headerTitle="Availability"
                        isButtonVisible
                        content={
                            <div className="space-y-2">
                                {userData.mentorAvailableTimes.map((data) => (
                                    <div
                                        key={data.id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-muted-foreground">
                                            {WEEK_DAYS[data.day]}
                                        </span>
                                        <div className="flex items-center text-muted-foreground">
                                            <div>0</div>
                                            <div className="mx-2 flex">
                                                {timeCodeList.map((code) => (
                                                    <Square
                                                        key={code}
                                                        isChecked={data.timeCode.includes(
                                                            code
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <div>24</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    <Card
                        headerTitle={
                            <div className="flex items-center">
                                <p>Appointments</p>
                            </div>
                        }
                        content={
                            <div className="flex max-h-[200px] flex-1 flex-col space-y-2 overflow-y-scroll px-2">
                                {bookingRecordList &&
                                    bookingRecordList.map((data, index) => (
                                        <AppointmentButton
                                            key={index}
                                            ref={
                                                index ===
                                                bookingRecordList.length - 1
                                                    ? ref
                                                    : null
                                            }
                                            bookingAt={data.bookingAt}
                                            duration={data.duration}
                                            onClick={() => {
                                                setBookingId(data.id)
                                                openAppointmentModal()
                                            }}
                                        />
                                    ))}
                            </div>
                        }
                    />
                </div>

                {/* Expertise Section */}
                <Card
                    headerTitle={
                        <div className="flex items-center">
                            <Award className="mr-2 h-5 w-5 text-muted-foreground" />
                            <p>Expertise</p>
                        </div>
                    }
                    content={
                        <div className="space-y-6">
                            {userData.primaryExpertise && (
                                <div>
                                    <h3 className="font-semibold">Primary:</h3>
                                    <span className="text-sm text-muted-foreground">
                                        {userData.primaryExpertise}
                                    </span>
                                </div>
                            )}
                            {userData.secondaryExpertise && (
                                <div className="mt-2">
                                    <h3 className="font-semibold">
                                        Secondary:
                                    </h3>
                                    <span className="text-sm text-muted-foreground">
                                        {userData.secondaryExpertise}
                                    </span>
                                </div>
                            )}
                            {userData.tertiaryExpertise && (
                                <div className="mt-2">
                                    <h3 className="font-semibold">Tertiary:</h3>
                                    <span className="text-sm text-muted-foreground">
                                        {userData.tertiaryExpertise}
                                    </span>
                                </div>
                            )}
                        </div>
                    }
                />

                {/* Disciplines Section */}
                <Card
                    className="mb-6"
                    isButtonVisible
                    headerTitle="Disciplines"
                    onClick={() => {}}
                    content={
                        <div className="flex flex-wrap gap-2">
                            {userData.mentorDisciplines.map(
                                (discipline: Discipline) => (
                                    <Badge
                                        key={discipline.id}
                                        variant="secondary"
                                    >
                                        {discipline.discipline}
                                    </Badge>
                                )
                            )}
                        </div>
                    }
                />

                {/* Skills and Tools Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card
                        headerTitle="Skills"
                        isButtonVisible
                        onClick={() => {}}
                        content={
                            <div className="flex flex-wrap gap-2">
                                {userData.mentorSkills.map((skill: Skill) => (
                                    <Badge key={skill.id} variant="outline">
                                        {skill.skill}
                                    </Badge>
                                ))}
                            </div>
                        }
                    />

                    <Card
                        headerTitle="Tools"
                        isButtonVisible
                        onClick={() => {}}
                        content={
                            <div className="flex flex-wrap gap-2">
                                {userData.mentorTools.map((tool: Tool) => (
                                    <Badge key={tool.id} variant="outline">
                                        {tool.tool}
                                    </Badge>
                                ))}
                            </div>
                        }
                    />
                </div>

                {/* Experience Section */}
                <Card
                    className="mb-6"
                    headerTitle={
                        <div className="flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />
                            <p>Work Experience</p>
                        </div>
                    }
                    content={
                        <div className="space-y-6">
                            {mentorData.experience.map((exp, index) => (
                                <div key={index}>
                                    {index > 0 && (
                                        <Separator className="my-4" />
                                    )}
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {exp.role}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {exp.company}
                                    </p>
                                    <p className="mt-2 text-sm">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    }
                />

                {/* Education Section */}
                <Card
                    headerTitle={
                        <div className="flex items-center">
                            <GraduationCap className="mr-2 h-5 w-5 text-muted-foreground" />
                            <p>Education</p>
                        </div>
                    }
                    isButtonVisible
                    onClick={() => {}}
                    content={
                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                {EDUCATION[Number(userData.education)]}
                            </h3>
                        </div>
                    }
                />
            </div>
            <AppointmentModal bookingId={bookingId} />
            <ImageModal />
            <EditProfileModal profileData={userData} onSave={profileUpdate} />
        </div>
    )
}
