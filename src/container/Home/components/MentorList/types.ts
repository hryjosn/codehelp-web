export type Education = string

export type Experience = {
    title: string
    company: string
    description: string
}

export type Mentor = {
    id: string
    name: string
    bio: string
    slug: string
    country: string
    company: string
    title: string
    yearOfExperience: number
    totalSessions: number
    totalReviews: number
    avatar: string
    experience: Experience[]
    education: Education
}
