-- CreateTable
CREATE TABLE "library_books" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "librarian_id" TEXT NOT NULL,
    "book_title" TEXT NOT NULL,
    "remaining_books" INTEGER,
    "publisher" TEXT NOT NULL,
    "published_year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "library_books_pkey" PRIMARY KEY ("id")
);
