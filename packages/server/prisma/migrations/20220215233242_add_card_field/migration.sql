/*
  Warnings:

  - Added the required column `card` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "card" TEXT NOT NULL;
