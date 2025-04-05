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
} from 'lucide-react'
import { Discipline, Props, Skill, Tool } from './types'
import Header from '~/components/Header/Header'
import Card from '../components/Card/Card'
import { GENDER_LIST, LEVEL_LIST } from '../types'

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
    education: [
        {
            degree: 'Ph.D. in Computer Science',
            institution: 'Stanford University',
            year: '2008',
        },
        {
            degree: 'M.S. in Software Engineering',
            institution: 'MIT',
            year: '2005',
        },
        {
            degree: 'B.S. in Computer Science',
            institution: 'UC Berkeley',
            year: '2003',
        },
    ],
    // Platform-specific stats
    availability: {
        status: 'Available',
        nextAvailable: 'Today, 3:00 PM',
        schedule: [
            { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
            { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
            { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
        ],
    },
}

export default function MentorPage({ userData }: Props) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <div className="mt-2 flex items-center md:mt-0">
                        <Badge
                            variant="outline"
                            className="mr-2 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400"
                        >
                            {mentorData.availability.status}
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
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
                                    <div className="text-muted-foreground mt-2 flex items-center">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        <span>{userData.country}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3">
                                    <div className="flex items-center text-sm">
                                        <Mail className="text-muted-foreground mr-3 h-4 w-4" />
                                        <span>{userData.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Phone className="text-muted-foreground mr-3 h-4 w-4" />
                                        <span>{userData.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Building className="text-muted-foreground mr-3 h-4 w-4" />
                                        <span>{userData.company}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <User className="text-muted-foreground mr-3 h-4 w-4" />
                                        <span>
                                            {GENDER_LIST[userData.gender]}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="text-muted-foreground mr-3 h-4 w-4" />
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
                        onClick={() => {}}
                        content={<p>{userData.introduction}</p>}
                    />
                </div>

                {/* Stats and Availability Section */}
                <Card
                    className="mb-6"
                    headerTitle="Availability"
                    onClick={() => {}}
                    content={
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Next Available:
                                </span>
                                <span className="font-medium">
                                    {mentorData.availability.nextAvailable}
                                </span>
                            </div>
                            <Separator className="my-2" />
                            {mentorData.availability.schedule.map(
                                (slot, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-muted-foreground">
                                            {slot.day}
                                        </span>
                                        <span>{slot.hours}</span>
                                    </div>
                                )
                            )}
                        </div>
                    }
                />

                {/* Expertise Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card
                        headerTitle={
                            <div className="flex items-center">
                                <Award className="text-muted-foreground mr-2 h-5 w-5" />
                                <p>Primary Expertise</p>
                            </div>
                        }
                        onClick={() => {}}
                        content={<p>{userData.primaryExpertise}</p>}
                    />

                    <Card
                        headerTitle={
                            <div className="flex items-center">
                                <Award className="text-muted-foreground mr-2 h-5 w-5" />
                                <p>Secondary Expertise</p>
                            </div>
                        }
                        onClick={() => {}}
                        content={<p>{userData.secondaryExpertise}</p>}
                    />
                </div>

                {/* Disciplines Section */}
                <Card
                    className="mb-6"
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
                            <Briefcase className="text-muted-foreground mr-2 h-5 w-5" />
                            <p>Work Experience</p>
                        </div>
                    }
                    onClick={() => {}}
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
                                        <span className="text-muted-foreground text-sm">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">
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
                            <GraduationCap className="text-muted-foreground mr-2 h-5 w-5" />
                            <p>Education</p>
                        </div>
                    }
                    onClick={() => {}}
                    content={
                        <div className="space-y-4">
                            {mentorData.education.map((edu, index) => (
                                <div key={index}>
                                    {index > 0 && (
                                        <Separator className="my-3" />
                                    )}
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {edu.degree}
                                        </h3>
                                        <span className="text-muted-foreground text-sm">
                                            {edu.year}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        {edu.institution}
                                    </p>
                                </div>
                            ))}
                        </div>
                    }
                />
            </div>
        </div>
    )
}
