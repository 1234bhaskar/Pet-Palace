-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Client', 'Admin', 'Seller');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Client',
ALTER COLUMN "lastName" DROP NOT NULL;
