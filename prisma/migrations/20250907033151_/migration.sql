/*
  Warnings:

  - The primary key for the `LoadApplications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `load_amount` on the `LoadApplications` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed` on the `LoadApplications` table. All the data in the column will be lost.
  - Added the required column `decision` to the `LoadApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dti` to the `LoadApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loan_amount` to the `LoadApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ltv` to the `LoadApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasons` to the `LoadApplications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LoadApplications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LoadApplications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monthly_income" REAL NOT NULL,
    "monthly_debts" REAL NOT NULL,
    "loan_amount" REAL NOT NULL,
    "property_value" REAL NOT NULL,
    "credit_score" INTEGER NOT NULL,
    "occupancy_type" TEXT NOT NULL,
    "dti" REAL NOT NULL,
    "ltv" REAL NOT NULL,
    "decision" TEXT NOT NULL,
    "reasons" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_LoadApplications" ("createdAt", "credit_score", "id", "monthly_debts", "monthly_income", "occupancy_type", "property_value") SELECT "createdAt", "credit_score", "id", "monthly_debts", "monthly_income", "occupancy_type", "property_value" FROM "LoadApplications";
DROP TABLE "LoadApplications";
ALTER TABLE "new_LoadApplications" RENAME TO "LoadApplications";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
