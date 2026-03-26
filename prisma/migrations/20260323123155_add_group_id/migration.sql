/*
  Warnings:

  - A unique constraint covering the columns `[groupId,memberId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "memberId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "group_code_key" ON "group"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_groupId_memberId_key" ON "user"("groupId", "memberId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
