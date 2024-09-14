interface mentorStep1T {
    phoneNumber: string
    gender: string
    country: string
}
interface mentorStep2T {
    title: string
    company: string
    years: string
    linkedIn: string
}
interface mentorStep3T {
    expertise: string[]
    disciplines: string[]
    skills: string[]
    tools: string[]
}
interface studentStep1T {
    phoneNumber: string
    country: string
}
interface studentStep2T {
    title: string
    company: string
}
interface studentStep3T {
    work: string
    level: string
}
type SignUpInputT = {
    userName: string
    email: string
    password: string
}
