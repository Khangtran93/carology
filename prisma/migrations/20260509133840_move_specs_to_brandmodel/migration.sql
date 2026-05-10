/*
  Warnings:

  - You are about to drop the column `carModelId` on the `Specs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brandModelId]` on the table `Specs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandModelId` to the `Specs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Specs" DROP CONSTRAINT "Specs_carModelId_fkey";

-- DropIndex
DROP INDEX "Specs_carModelId_key";

-- AlterTable
ALTER TABLE "Specs" DROP COLUMN "carModelId",
ADD COLUMN     "brandModelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Specs_brandModelId_key" ON "Specs"("brandModelId");

-- AddForeignKey
ALTER TABLE "Specs" ADD CONSTRAINT "Specs_brandModelId_fkey" FOREIGN KEY ("brandModelId") REFERENCES "BrandModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
