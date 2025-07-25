/*
  Warnings:

  - Added the required column `name` to the `CarModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarModel" ADD COLUMN     "name" TEXT NOT NULL;
