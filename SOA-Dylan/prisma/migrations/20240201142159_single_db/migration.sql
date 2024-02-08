/*
  Warnings:

  - You are about to drop the column `workerId` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."profiles" DROP COLUMN "workerId";

-- AddForeignKey
ALTER TABLE "worker"."workers" ADD CONSTRAINT "workers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "auth"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage"."units" ADD CONSTRAINT "units_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
