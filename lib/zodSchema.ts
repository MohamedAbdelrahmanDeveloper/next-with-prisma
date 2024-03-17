import * as z from 'zod'

export const UserZodSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }).min(1, 'Name is required'),
    username : z.string({
        required_error: 'Username is required'
    }).min(1, 'Username is required').max(15).toLowerCase(),
    email: z.string({
        required_error: 'Email is required'
    }).min(1, "Email is required").email('Invalid email').toLowerCase(),
    password: z.string({
        required_error: 'Password is required'
    }).min(8, 'Password is requires , 8 charecters')
})

export const LoginZodSchema = z.object({
    email: z.string({
        required_error: 'Name is required'
    }).min(1, "Email is required").email('Invalid email').toLowerCase(),
    password: z.string({
        required_error: 'Password is required'
    }).min(8, 'Password is requires , 8 charecters')
})

export const UserUpdateZodSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    username : z.string().min(1, 'Username is required').max(15).toLowerCase(),
})
