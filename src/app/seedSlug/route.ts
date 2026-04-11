// import { Brand, BrandModel, CarModel } from "@/generated/prisma";
// import prisma from "../../../lib/prisma";
// import slugify from "slugify"
// async function seedSlugBrand() {
//   try {
//     const brands = await prisma.brand.findMany()
//     console.log("brands: ", brands)
//   for (const brand of brands as Brand[]) {
//     const slug = slugify(brand.name, { lower: true, strict: true })
//     await prisma.brand.update({
//       where: { id: brand.id },
//       data: { slug }
//     })
//   }
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// async function seedSlugBrandModel() {
//   console.log("seeding brandmodel")
//   try {
//     const brandModels = await prisma.brandModel.findMany({
//       include: {
//         brand: {
//           select: {
//             name: true
//           }
//         }
//       }
//     })
//   for (const brandModel of brandModels) {
//     const slug = slugify(brandModel.name, { lower: true, strict: true })
//     await prisma.brandModel.update({
//       where: { id: brandModel.id },
//       data: { slug }
//     })
//   }
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// async function seedSlugModel() {
//   try {
//     const carModels = await prisma.carModel.findMany({})
//   for (const carModel of carModels as CarModel[]) {
//     const slug = slugify(String(carModel.year), { lower: true, strict: true })
//     await prisma.carModel.update({
//       where: { id: carModel.id },
//       data: { slug }
//     })
//   }
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export async function GET() {
//   try {
//     console.log("Seeding....")
//     // await seedSlugBrand();
//     // await seedSlugBrandModel()
//     await seedSlugModel()
//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }