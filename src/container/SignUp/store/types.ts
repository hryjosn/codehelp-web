import Joi from 'joi'

export enum MENTOR_DISCIPLINES {
    COMPUTER_SCIENCE = 'Computer Science',
    ENGINEERING = 'Engineering',
    BUSINESS_ADMINISTRATION = 'Business Administration',
    MEDICINE = 'Medicine',
    LAW = 'Law',
    DESIGN = 'Design',
    PSYCHOLOGY = 'Psychology',
    BIOLOGY = 'Biology',
    ECONOMICS = 'Economics',
    SOCIOLOGY = 'Sociology',
}

export enum MENTOR_SKILLS {
    HTML = 'HTML',
    CSS = 'CSS',
    JAVASCRIPT = 'JavaScript',
    TYPESCRIPT = 'TypeScript',
    REACT = 'React',
    VUE_JS = 'Vue.js',
    ANGULAR = 'Angular',
    NODE_JS = 'Node.js',
    EXPRESS_JS = 'Express.js',
    PYTHON = 'Python',
    DJANGO = 'Django',
    FLASK = 'Flask',
    RUBY = 'Ruby',
    RUBY_ON_RAILS = 'Ruby on Rails',
    JAVA = 'Java',
    SPRING = 'Spring',
    PHP = 'PHP',
    LARAVEL = 'Laravel',
    C_SHARP = 'C#',
    ASP_NET = 'ASP.NET',
    SWIFT = 'Swift',
    KOTLIN = 'Kotlin',
    FLUTTER = 'Flutter',
    REACT_NATIVE = 'React Native',
    SQL = 'SQL',
    NO_SQL = 'NoSQL',
    GIT = 'Git',
    DOCKER = 'Docker',
    KUBERNETES = 'Kubernetes',
    CI_CD = 'CI/CD',
    MACHINE_LEARNING = 'Machine Learning',
    DATA_ANALYSIS = 'Data Analysis',
    UI_UX_DESIGN = 'UI/UX Design',
    ADOBE_PHOTOSHOP = 'Adobe Photoshop',
    SKETCH = 'Sketch',
    FIGMA = 'Figma',
    IN_VISION = 'InVision',
    PROTOTYPING = 'Prototyping',
    CYBERSECURITY = 'Cybersecurity',
}

export enum MENTOR_TOOLS {
    REACT = 'React',
    VUE_JS = 'Vue.js',
    ANGULAR = 'Angular',
    HTML = 'HTML',
    CSS = 'CSS',
    JAVASCRIPT = 'JavaScript',
    NODE_JS = 'Node.js',
    DJANGO = 'Django',
    FLASK = 'Flask',
    RUBY_ON_RAILS = 'Ruby on Rails',
    SPRING = 'Spring',
    EXPRESS_JS = 'Express.js',
    MEAN_STACK = 'MEAN Stack',
    MERN_STACK = 'MERN Stack',
    LAMP_STACK = 'LAMP Stack',
    GRAPHQL = 'GraphQL',
    FIREBASE = 'Firebase',
    FIGMA = 'Figma',
    SKETCH = 'Sketch',
    ADOBE_XD = 'Adobe XD',
    IN_VISION = 'InVision',
    AXURE_RP = 'Axure RP',
    ADOBE_PHOTOSHOP = 'Adobe Photoshop',
    ADOBE_ILLUSTRATOR = 'Adobe Illustrator',
    COREL_DRAW = 'CorelDRAW',
    AFFINITY_DESIGNER = 'Affinity Designer',
    INKSCAPE = 'Inkscape',
    DOCKER = 'Docker',
    KUBERNETES = 'Kubernetes',
    JENKINS = 'Jenkins',
    ANSIBLE = 'Ansible',
    TERRAFORM = 'Terraform',
    REACT_NATIVE = 'React Native',
    FLUTTER = 'Flutter',
    SWIFT = 'Swift',
    KOTLIN = 'Kotlin',
    XAMARIN = 'Xamarin',
}

export type SignUpInputT = {
    avatar: File
    userName: string
    email: string
    password: string
}
export interface mentorSignUpT {
    phoneNumber: string
    gender: string
    country: string
    title: string
    company: string
    years: string
    linkedIn: string
    expertise: string[]
    disciplines: MENTOR_DISCIPLINES[]
    skills: MENTOR_SKILLS[]
    tools: MENTOR_TOOLS[]
    level: string
    introduction: string
    education: string
}
export interface memberSignUpT {
    phoneNumber: string
    gender: string
    country: string
    title: string
    company: string
    work: string[]
    level: string
    introduction: string
}

export const mentorSchema = Joi.object({
    phoneNumber: Joi.string().max(17).required().messages({
        'string.empty': 'Phone number is required',
        'string.max': "This doesn't look like a phone number",
    }),
    gender: Joi.string()
        .required()
        .messages({ 'any.required': 'Gender is required' }),
    country: Joi.string()
        .required()
        .messages({ 'any.required': 'Country is required' }),
    title: Joi.string().max(100).required().messages({
        'any.required': 'Title is required',
        'string.max': 'Title cannot exceed 100 characters',
    }),
    company: Joi.string().required().messages({
        'string.empty': 'Company name is required',
    }),
    education: Joi.string().required().messages({
        'string.empty': 'Education is required',
    }),
    years: Joi.number().min(0).max(60).required().messages({
        'any.required': 'Please enter the number of years',
        'number.min': 'Years cannot be less than 0',
        'number.max': 'Years cannot exceed 60',
    }),
    linkedIn: Joi.string()
        .uri()
        .pattern(/^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/.*$/)
        .required()
        .messages({
            'any.required': 'Please provide a LinkedIn profile URL',
            'string.pattern.base': 'Invalid LinkedIn URL format',
            'string.uri': 'Please enter a valid LinkedIn URL',
        }),
    expertise: Joi.array().min(1).max(3).required().messages({
        'array.min': 'Please select at least 1 area of expertise',
        'array.max': 'You can select up to 3 areas of expertise',
        'any.required': 'Expertise is a required field',
    }),
    disciplines: Joi.array().min(1).required().messages({
        'array.min': 'Please select at least 1 discipline',
        'any.required': 'Disciplines is a required field',
    }),
    skills: Joi.array().min(1).required().messages({
        'array.min': 'Please select at least 1 skill',
        'any.required': 'Skills is a required field',
    }),
    tools: Joi.array().min(1).required().messages({
        'array.min': 'Please select at least 1 tool',
        'any.required': 'Tools is a required field',
    }),
    level: Joi.string().required().messages({
        'any.required': 'Level is required',
    }),
    introduction: Joi.string().required().messages({
        'string.empty': 'Introduction is a required field',
    }),
})
export const memberSchema = Joi.object({
    phoneNumber: Joi.string().max(17).required().messages({
        'string.empty': 'Phone number is required',
        'string.max': "This doesn't look like a phone number",
    }),
    gender: Joi.string()
        .required()
        .messages({ 'any.required': 'Gender is required' }),
    country: Joi.string().required().messages({
        'string.empty': 'Country is required',
    }),
    title: Joi.string().max(100).required().messages({
        'string.max': 'Title should not exceed 100 characters',
        'string.empty': 'Title is required',
    }),
    company: Joi.string().required().messages({
        'string.empty': 'Company name is required',
    }),
    work: Joi.array().required().messages({
        'any.required': 'Work is required',
    }),
    level: Joi.string().required().messages({
        'any.required': 'Level is required',
    }),
    introduction: Joi.string()
        .required()
        .messages({ 'string.empty': 'Introduction is required' }),
})
export const signUpSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().min(8).max(30).required(),
    avatar: Joi.any(),
})
