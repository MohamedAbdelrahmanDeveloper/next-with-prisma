import * as z from 'zod'

export const UserZodSchema = z.object({
    firstName: z.string().min(1, 'Firstname is required'),
    lastName: z.string().min(1, 'Lastname is required'),
    username : z.string().min(1, 'Username is required').max(15),
    email: z.string().min(1, "Email is required").email('Invalid email'),
    password: z.string().min(8, 'Password is requires , 8 charecters')
})

export const LoginZodSchema = z.object({
    email: z.string().min(1, "Email is required").email('Invalid email'),
    password: z.string().min(8, 'Password is requires , 8 charecters')
})

export const ErrorZod = ({error}:{error: unknown}) => {
    if (error) {
        if (error instanceof z.ZodError) {
            const err = error.errors.reduce((acc, err) => {
                return {
                  ...acc,
                  [err.path.join('.')]: err.message,
                };
              }, {})
            return err
        }
    }
}