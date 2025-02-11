/*
  Warnings:

  - Added the required column `publishing_house` to the `books_imports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books_imports" ADD COLUMN     "publishing_house" VARCHAR(50) NOT NULL;
