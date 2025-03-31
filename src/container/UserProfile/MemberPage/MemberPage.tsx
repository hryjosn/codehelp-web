'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Separator } from '../components/separator'
import { User, Mail, Phone, MapPin, Building, Edit, Clock } from 'lucide-react'
import Header from '~/components/Header/Header'
import levelList from '~/constant/data/level.json'
import genderList from '~/constant/data/gender.json'
import Card from '../components/Card/Card'
import { Props } from './types'

export default function MemberPage({ userData }: Props) {
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
                                            {
                                                genderList.find(
                                                    (data) =>
                                                        data.code ===
                                                        userData.gender.toString()
                                                )?.name
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="text-muted-foreground mr-3 h-4 w-4" />
                                        <span>
                                            {
                                                levelList.find(
                                                    (data) =>
                                                        data.code ===
                                                        userData.level.toString()
                                                )?.name
                                            }
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

                {/* Work Section */}
                <Card
                    className="mb-6"
                    headerTitle="Work Experience"
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
        </div>
    )
}
