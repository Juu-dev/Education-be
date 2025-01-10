/*
  Warnings:

  - Added the required column `book_type` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "book_type" VARCHAR(50) NOT NULL;
