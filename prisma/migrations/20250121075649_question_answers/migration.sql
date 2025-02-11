/*
  Warnings:

  - You are about to drop the `question_responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "question_responses" DROP CONSTRAINT "question_responses_question_id_fkey";

-- DropForeignKey
ALTER TABLE "question_responses" DROP CONSTRAINT "question_responses_response_id_fkey";

-- DropForeignKey
ALTER TABLE "question_responses" DROP CONSTRAINT "question_responses_selected_option_id_fkey";

-- DropTable
DROP TABLE "question_responses";

-- CreateTable
CREATE TABLE "question_answers" (
    "id" TEXT NOT NULL,
    "answer_id" VARCHAR(36) NOT NULL,
    "question_id" VARCHAR(36) NOT NULL,
    "selected_option_id" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
