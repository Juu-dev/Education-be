/*
  Warnings:

  - You are about to drop the column `remaining_books` on the `library_books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "library_books" DROP COLUMN "remaining_books",
ADD COLUMN     "total_books" INTEGER;
