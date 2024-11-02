import Joi from 'joi'

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
    disciplines: string[]
    skills: string[]
    tools: string[]
    level: string
    introduction: string
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
