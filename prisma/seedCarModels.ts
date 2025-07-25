import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient()

async function main() {
  const brandModels = await prisma.brandModel.findMany()
  const yearRange = Array.from({length: 16}, (_, i) => 2010 + i)
  console.log("yearRange ", yearRange)
  const carModels = []
  
  for (const brandModel of brandModels) {
    for (const year of yearRange) {
      carModels.push({
        name: brandModel.name,
        year: year,        
        brandModel: {
          connect: { id: brandModel.id }, 
        },
      })
    }
  }


  for (const data of carModels) {
    await prisma.carModel.create({data})
  }

}


main()
.then(() => prisma.$disconnect())
.catch(async (e) => {
  console.log(e)
  await prisma.$disconnect()
  process.exit(1)
})