-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "publishing_house" VARCHAR(50) NOT NULL,
    "cover" VARCHAR(255),
    "content_pdf_url" VARCHAR(255),
    "evaluate" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
