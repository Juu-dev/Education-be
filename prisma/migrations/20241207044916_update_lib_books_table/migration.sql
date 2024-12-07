/*
  Warnings:

  - You are about to drop the column `book_id` on the `library_books` table. All the data in the column will be lost.
  - You are about to drop the column `librarian_id` on the `library_books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "library_books" DROP COLUMN "book_id",
DROP COLUMN "librarian_id";
