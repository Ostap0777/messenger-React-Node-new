-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "contactUserId" TEXT NOT NULL,
    "customName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_ownerId_idx" ON "Contact"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_ownerId_contactUserId_key" ON "Contact"("ownerId", "contactUserId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contactUserId_fkey" FOREIGN KEY ("contactUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
