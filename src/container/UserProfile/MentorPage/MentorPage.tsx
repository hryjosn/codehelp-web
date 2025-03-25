import { Avatar, AvatarFallback, AvatarImage } from './components/avatar'
import { Badge } from './components/badge'
import { Button } from './components/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/card'
import { Separator } from './components/separator'
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

// This would typically come from an API or database
const mentorData = {
    userName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
    gender: 'Female',
    country: 'United States',
    introduction:
        'Experienced software architect with 15+ years in the industry. Passionate about mentoring the next generation of developers and helping them grow in their careers.',
    company: 'TechInnovate Solutions',
    phoneNumber: '+1 (555) 123-4567',
    level: 'Senior (15+ years)',
    primaryExpertise: 'Software Architecture',
    secondaryExpertise: 'Cloud Infrastructure',
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
    mentorDisciplines: [
        'Software Development',
        'System Design',
        'DevOps',
        'Cloud Architecture',
    ],
    mentorSkills: [
        'JavaScript',
        'Python',
        'React',
        'Node.js',
        'AWS',
        'Docker',
        'Kubernetes',
        'GraphQL',
        'REST API Design',
    ],
    mentorTools: [
        'VS Code',
        'GitHub',
        'JIRA',
        'Figma',
        'AWS Console',
        'Terraform',
        'Jenkins',
    ],
    // Platform-specific stats
    stats: {
        totalSessions: 128,
        totalStudents: 47,
        averageRating: 4.9,
        responseRate: 98,
    },
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

export default function MentorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
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
                    <Card className="lg:col-span-1">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="mb-4 h-24 w-24">
                                    <AvatarImage
                                        src={mentorData.avatar}
                                        alt={mentorData.userName}
                                    />
                                    <AvatarFallback>
                                        {mentorData.userName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-semibold">
                                    {mentorData.userName}
                                </h2>
                                <p className="text-muted-foreground">
                                    {mentorData.primaryExpertise}
                                </p>
                                <div className="text-muted-foreground mt-2 flex items-center">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    <span>{mentorData.country}</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <Mail className="text-muted-foreground mr-3 h-4 w-4" />
                                    <span>{mentorData.email}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Phone className="text-muted-foreground mr-3 h-4 w-4" />
                                    <span>{mentorData.phoneNumber}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Building className="text-muted-foreground mr-3 h-4 w-4" />
                                    <span>{mentorData.company}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <User className="text-muted-foreground mr-3 h-4 w-4" />
                                    <span>{mentorData.gender}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Clock className="text-muted-foreground mr-3 h-4 w-4" />
                                    <span>{mentorData.level}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle>About Me</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{mentorData.introduction}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats and Availability Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle>Platform Statistics</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-800">
                                    <div className="text-2xl font-semibold">
                                        {mentorData.stats.totalSessions}
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                        Sessions
                                    </div>
                                </div>
                                <div className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-800">
                                    <div className="text-2xl font-semibold">
                                        {mentorData.stats.totalStudents}
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                        Students
                                    </div>
                                </div>
                                <div className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-800">
                                    <div className="text-2xl font-semibold">
                                        {mentorData.stats.averageRating}
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                        Avg. Rating
                                    </div>
                                </div>
                                <div className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-800">
                                    <div className="text-2xl font-semibold">
                                        {mentorData.stats.responseRate}%
                                    </div>
                                    <div className="text-muted-foreground text-xs">
                                        Response
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle>Availability</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </div>

                {/* Expertise Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle className="flex items-center">
                                    <Award className="text-muted-foreground mr-2 h-5 w-5" />
                                    Primary Expertise
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{mentorData.primaryExpertise}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle className="flex items-center">
                                    <Award className="text-muted-foreground mr-2 h-5 w-5" />
                                    Secondary Expertise
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{mentorData.secondaryExpertise}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Disciplines Section */}
                <Card className="mb-6">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between">
                            <CardTitle>Disciplines</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {mentorData.mentorDisciplines.map(
                                (discipline, index) => (
                                    <Badge key={index} variant="secondary">
                                        {discipline}
                                    </Badge>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Skills and Tools Section */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle>Skills</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {mentorData.mentorSkills.map((skill, index) => (
                                    <Badge key={index} variant="outline">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardTitle>Tools</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {mentorData.mentorTools.map((tool, index) => (
                                    <Badge key={index} variant="outline">
                                        {tool}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Experience Section */}
                <Card className="mb-6">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between">
                            <CardTitle className="flex items-center">
                                <Briefcase className="text-muted-foreground mr-2 h-5 w-5" />
                                Work Experience
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                </Card>

                {/* Education Section */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between">
                            <CardTitle className="flex items-center">
                                <GraduationCap className="text-muted-foreground mr-2 h-5 w-5" />
                                Education
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
