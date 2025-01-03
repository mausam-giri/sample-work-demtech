-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "userGroupId" TEXT NOT NULL,
    "scheduleDate" TEXT NOT NULL,
    "scheduleTime" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_id_key" ON "Campaign"("id");
