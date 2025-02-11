/*
  Warnings:

  - You are about to drop the `responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "question_responses" DROP CONSTRAINT "question_responses_response_id_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_user_id_fkey";

-- DropTable
DROP TABLE "responses";

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "exercise_id" VARCHAR(36) NOT NULL,
    "mark" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_responses" ADD CONSTRAINT "question_responses_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
