/*
  Warnings:

  - The values [TRUCK,MINIVAN] on the enum `CarType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `engine` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the column `trim` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CarModel` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'HYBRID', 'PHEV', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "Drivetrain" AS ENUM ('FWD', 'RWD', 'AWD', 'FOUR_WD');

-- DropForeignKey
ALTER TABLE "BrandModel" DROP CONSTRAINT "BrandModel_brandId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_brandModelId_fkey";

-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_carModelId_fkey";

-- AlterTable
ALTER TABLE "CarModel" DROP COLUMN "engine",
DROP COLUMN "trim",
DROP COLUMN "type";

-- AlterEnum
BEGIN;
CREATE TYPE "CarType_new" AS ENUM ('SEDAN', 'COUPE', 'HATCHBACK', 'SUV', 'UTE', 'VAN', 'PEOPLE_MOVER', 'CONVERTIBLE', 'WAGON');
ALTER TYPE "CarType" RENAME TO "CarType_old";
ALTER TYPE "CarType_new" RENAME TO "CarType";
DROP TYPE "CarType_old";
COMMIT;

-- AlterTable: add carType to BrandModel using new enum
ALTER TABLE "BrandModel" ADD COLUMN "carType" "CarType";

-- CreateTable
CREATE TABLE "Trim" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "carModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL,
    "carModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModelImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specs" (
    "id" TEXT NOT NULL,
    "carModelId" TEXT NOT NULL,
    "engineSize" DOUBLE PRECISION,
    "power" INTEGER,
    "torque" INTEGER,
    "fuelType" "FuelType",
    "fuelEconomy" DOUBLE PRECISION,
    "transmission" TEXT,
    "drivetrain" "Drivetrain",
    "seats" INTEGER,
    "bootCapacity" INTEGER,
    "startingPrice" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Trim_carModelId_idx" ON "Trim"("carModelId");

-- CreateIndex
CREATE INDEX "ModelImage_carModelId_idx" ON "ModelImage"("carModelId");

-- CreateIndex
CREATE UNIQUE INDEX "Specs_carModelId_key" ON "Specs"("carModelId");

-- CreateIndex
CREATE INDEX "BrandModel_carType_idx" ON "BrandModel"("carType");

-- CreateIndex
CREATE INDEX "CarModel_brandModelId_idx" ON "CarModel"("brandModelId");

-- CreateIndex
CREATE INDEX "Complaint_carModelId_idx" ON "Complaint"("carModelId");

-- CreateIndex
CREATE INDEX "Complaint_userId_idx" ON "Complaint"("userId");

-- AddForeignKey
ALTER TABLE "BrandModel" ADD CONSTRAINT "BrandModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_brandModelId_fkey" FOREIGN KEY ("brandModelId") REFERENCES "BrandModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trim" ADD CONSTRAINT "Trim_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelImage" ADD CONSTRAINT "ModelImage_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specs" ADD CONSTRAINT "Specs_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
