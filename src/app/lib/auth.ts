'use server';
import { AuthError } from "next-auth";
import { signIn, signOut } from "../../../auth";
import { FormState, SignupFormSchema } from "./definition";
import bcrypt from 'bcrypt'
import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";


export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("logging user...")
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(prevState: FormState , formData: FormData) {
  console.log('ACTION TRIGGERED')
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmedPassword: formData.get('confirmedPassword')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const {name, email, password} = validatedFields.data

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
  
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    console.error(error)
    return {
      message: 'Database Error: Failed to Create User.',
    }
  }
  redirect('/')
}

export async function signOutAction() {
  await signOut({redirectTo:'/'})
}