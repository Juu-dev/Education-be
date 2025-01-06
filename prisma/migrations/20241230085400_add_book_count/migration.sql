/*
  Warnings:

  - Added the required column `total_books` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "borrowed_books" INTEGER,
ADD COLUMN     "total_books" INTEGER NOT NULL;
