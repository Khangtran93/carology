'use server'
import prisma from "../../../lib/prisma";
import { ComplaintSchema, ComplaintState } from "./definition";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export async function createComplaint(prevState: ComplaintState, formData: FormData) {
  console.log("creating complaint")
  console.log("formData ", formData)
  let complaint
  const validatedFields = ComplaintSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('complaint'),
    userId: formData.get('userId'),
    carModelId: formData.get('carModelId')
  })

  if (!validatedFields.success) {
    console.log("validation failed")
    console.log(validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Complaint.',
    };
  }
  const {title, content, userId, carModelId} = validatedFields.data
  try {
    console.log("trying to create complaint")
    complaint = await prisma.complaint.create({
      data: {
        title: title,
        content: content,
        userId: userId,
        carModelId: carModelId
      },
      include: {
        carModel: {
          include: {
            brandModel: {
              include: {
                brand: true
              }
            }
          }
        }
      }
  })
    // return { message: 'Complaint created successfully.', errors: {} }
  } catch (error) {
    console.error(error)
    return { message: 'Failed to create complaint.', errors: {} }
  }
  revalidatePath(`/brand/${complaint.carModel.brandModel.brand.slug}/${complaint.carModel.brandModel.slug}/${complaint.carModel.slug}`)
  redirect(`/brand/${complaint.carModel.brandModel.brand.slug}/${complaint.carModel.brandModel.slug}/${complaint.carModel.slug}`);
}