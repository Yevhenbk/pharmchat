-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatTitle" TEXT NOT NULL,
    "kindeAuthId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kindeAuthId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
