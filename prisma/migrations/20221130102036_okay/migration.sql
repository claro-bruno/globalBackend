-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL,
ALTER COLUMN "monday" DROP NOT NULL,
ALTER COLUMN "tuesday" DROP NOT NULL,
ALTER COLUMN "wednesday" DROP NOT NULL,
ALTER COLUMN "thursday" DROP NOT NULL,
ALTER COLUMN "friday" DROP NOT NULL,
ALTER COLUMN "saturday" DROP NOT NULL,
ALTER COLUMN "sunday" DROP NOT NULL;