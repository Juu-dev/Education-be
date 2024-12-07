/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "publishing_house" VARCHAR(50) NOT NULL,
    "cover" VARCHAR(255),
    "content_pdf_url" VARCHAR(255),
    "evaluate" INTEGER,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
