-- AlterTable
ALTER TABLE "course" ADD COLUMN     "code" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "enrollment" ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;
