/*
  Warnings:

  - You are about to drop the column `content` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "content",
ADD COLUMN     "HTMLcontent" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "unformattedContent" TEXT NOT NULL DEFAULT '';
