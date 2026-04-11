/*
  Warnings:

  - Made the column `slug` on table `Brand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `BrandModel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `CarModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "BrandModel" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "CarModel" ALTER COLUMN "slug" SET NOT NULL;
