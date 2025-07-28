/*
  Warnings:

  - You are about to drop the column `deleted` on the `Quote` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movie" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Quote" ("ID", "character", "movie", "quote") SELECT "ID", "character", "movie", "quote" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
