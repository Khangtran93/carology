import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient()

async function main() {
  await prisma.carModel.deleteMany()
}

main()
.then(() => prisma.$disconnect())
.catch( async(e) => {
  console.log(e)
  await prisma.$disconnect()
  process.exit(1)
})