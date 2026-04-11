import { z } from 'zod'
import { Prisma } from '../../generated/prisma'

export const SignupFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {message: 'Contain at least one special character.'})
    .trim(),
  confirmedPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmedPassword, {
  message: 'Passwords do not match.'
})

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export const ComplaintSchema = z.object({
  title: z.string().min(6, {message: "Please create a more meaningful title"}),
  content: z.string().min(10, {message: "Please provide more details"}),
  userId: z.string(),
  carModelId: z.string()
})

 
export type FormState =
 {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        confirmedPassword?: string[]
      }
      message?: string | null
    }

export type CarModelWithRelations = Prisma.CarModelGetPayload<{
      include: {
        brandModel: {
          include: {
            brand: true
          }
        },
        complaints: {
          include: {
            user: true
          }
        }
      }
    }>

    export type ComplaintState = {
      errors?: {
        title?: string[]  | undefined,
        content?: string[] | undefined,
        userId?: string[] | undefined,
        carModelId?: string[] | undefined
      }
      message?: string | null
    }
