-- CreateTable
CREATE TABLE "books_imports" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "year_of_publishing" VARCHAR(50) NOT NULL,
    "amount" INTEGER,
    "borrowedAmount" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_imports_pkey" PRIMARY KEY ("id")
);
