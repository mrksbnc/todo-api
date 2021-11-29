/*
  Warnings:

  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `todo_description` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_user_id_fkey";

-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_group_id_fkey";

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "todo_description" TEXT NOT NULL;

-- DropTable
DROP TABLE "group";

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "group_name" VARCHAR(120) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
