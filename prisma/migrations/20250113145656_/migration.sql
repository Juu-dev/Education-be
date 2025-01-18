/*
  Warnings:

  - You are about to drop the column `year_of_publishing` on the `books_imports` table. All the data in the column will be lost.
  - Added the required column `year_of_publication` to the `books_imports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books_imports" DROP COLUMN "year_of_publishing",
ADD COLUMN     "year_of_publication" VARCHAR(50) NOT NULL;
