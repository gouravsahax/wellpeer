/*
  Warnings:

  - You are about to drop the column `commentCount` on the `Recc` table. All the data in the column will be lost.
  - You are about to drop the column `followerCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followingCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE IF EXISTS "Comment" DROP CONSTRAINT IF EXISTS "Comment_reccId_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "Comment" DROP CONSTRAINT IF EXISTS "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "Follow" DROP CONSTRAINT IF EXISTS "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "Follow" DROP CONSTRAINT IF EXISTS "Follow_followingId_fkey";

-- AlterTable
ALTER TABLE "Recc" DROP COLUMN IF EXISTS "commentCount",
ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN IF EXISTS "followerCount",
DROP COLUMN IF EXISTS "followingCount";

-- DropTable
DROP TABLE IF EXISTS "Comment";

-- DropTable
DROP TABLE IF EXISTS "Follow";
