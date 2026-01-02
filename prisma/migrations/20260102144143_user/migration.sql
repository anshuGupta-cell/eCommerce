/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_uid_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_uid_fkey";

-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "uid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "uid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "uid" DROP DEFAULT,
ALTER COLUMN "uid" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("uid");
DROP SEQUENCE "users_uid_seq";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
