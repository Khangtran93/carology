import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

const brandData: Prisma.BrandCreateInput[] = [
  { name: 'Audi' },
  { name: 'BMW' },
  { name: 'BYD' },
  { name: 'Citroen' },
  { name: 'Ford' },
  { name: 'Genesis' },
  { name: 'GWM' },
  { name: 'Haval' },
  { name: 'Honda' },
  { name: 'Holden' },
  { name: 'Hyundai' },
  { name: 'Infiniti' },
  { name: 'Isuzu' },
  { name: 'Kia' },
  { name: 'Lexus' },
  { name: 'Mazda' },
  { name: 'Mercedes-Benz' },
  { name: 'Mitsubishi' },
  { name: 'MG' },
  { name: 'Nissan' },
  { name: 'Peugeot' },
  { name: 'Porsche' },
  { name: 'Renault' },
  { name: 'Subaru' },
  { name: 'Tesla' },
  { name: 'Toyota' },
  { name: 'Volvo' },
  { name: 'VW' },
];


export async function main() {
  console.log("executing seed command")
  for (const b of brandData) {
    await prisma.brand.create({ data: b });
  }
}

main();