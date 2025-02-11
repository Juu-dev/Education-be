-- AlterTable
ALTER TABLE "books_imports" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "books_import_history" (
    "id" TEXT NOT NULL,
    "book_import_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "old_title" VARCHAR(50),
    "new_title" VARCHAR(50),
    "old_year_of_publication" VARCHAR(50),
    "new_year_of_publication" VARCHAR(50),
    "old_publishing_house" VARCHAR(50),
    "new_publishing_house" VARCHAR(50),
    "old_amount" INTEGER,
    "new_amount" INTEGER,
    "old_borrowed_amount" INTEGER,
    "new_borrowed_amount" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_import_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books_import_history" ADD CONSTRAINT "books_import_history_book_import_id_fkey" FOREIGN KEY ("book_import_id") REFERENCES "books_imports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
