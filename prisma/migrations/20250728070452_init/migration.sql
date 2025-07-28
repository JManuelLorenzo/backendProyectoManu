-- CreateTable
CREATE TABLE "Quote" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movie" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false
);
