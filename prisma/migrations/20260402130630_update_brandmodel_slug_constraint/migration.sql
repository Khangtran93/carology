/*
  Warnings:

  - A unique constraint covering the columns `[brandId,slug]` on the table `BrandModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandModelId,slug]` on the table `CarModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BrandModel_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "BrandModel_brandId_slug_key" ON "BrandModel"("brandId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "CarModel_brandModelId_slug_key" ON "CarModel"("brandModelId", "slug");
