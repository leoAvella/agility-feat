-- CreateTable
CREATE TABLE "LoadApplications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monthly_income" REAL NOT NULL,
    "monthly_debts" REAL NOT NULL,
    "load_amount" REAL NOT NULL,
    "credit_score" INTEGER NOT NULL,
    "property_value" REAL NOT NULL,
    "occupancy_type" TEXT NOT NULL,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
