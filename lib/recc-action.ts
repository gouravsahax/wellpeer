"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createRecc(data: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // console.log(data)

  const title = String(data.get("title") ?? "").trim();
  const desc = String(data.get("desc") ?? "").trim();
  const url = String(data.get("url") ?? "").trim();
  const type = String(data.get("type") ?? "").trim();

  if (!title || !url || !type) {
    throw new Error("Missing required fields");
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.recc.create({
        data: {
          title,
          description: desc,
          url,
          type,
          userId: session.user.id,
        },
      });
      await tx.user.update({
        where: { id: session.user.id },
        data: { reccCount: { increment: 1 } },
      });
    },
    {
      maxWait: 15000,
      timeout: 20000,
    }
  );

  redirect("/reccs");
}

export async function getMyReccs() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const [reccs, user] = await Promise.all([
      prisma.recc.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          reccCount: true,
        },
      }),
    ]);

    return {
      reccs,
      count: user?.reccCount ?? 0,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error occurred while fetching recommendations");
  }
}