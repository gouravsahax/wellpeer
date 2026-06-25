"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createRecc(data: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
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

export async function getAllRecs() {
  return await prisma.recc.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      type: true,
      likeCount: true,
      commentCount: true,
      createdAt: true,
      userId: true,

      user: {
        select: {
          name: true,
        },
      },
    },
  });
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

export async function getARecc(id:string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try{
    const reccData = await prisma.recc.findUnique({
      where : {
        id : id
      }
    })

    if(reccData?.userId !== session.user.id){
      throw new Error("Unauthorized");
    }

    return {title:reccData?.title, desc:reccData?.description}
  } catch {
    throw new Error("")
  }
}

export async function updateRecc(id: string, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("desc") ?? "").trim();

  if (!title) {
    throw new Error("Title is required");
  }

  const reccData = await prisma.recc.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!reccData) {
    throw new Error("Recommendation not found");
  }

  if (reccData.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.recc.update({
    where: { id },
    data: {
      title,
      description: description || null,
    },
  });

  revalidatePath("/reccs");
  revalidatePath(`/reccs/edit/${id}`);
  redirect("/reccs");
}

export async function deleteRecc(reccId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const recc = await prisma.recc.findUnique({
    where: { id: reccId },
    select: { id: true, userId: true },
  });

  if (!recc) {
    throw new Error("Recommendation not found");
  }

  if (recc.userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  await prisma.$transaction(
    async (tx) => {
      await tx.recc.delete({
        where: { id: reccId },
      });

      await tx.user.update({
        where: { id: session.user.id },
        data: {
          reccCount: {
            decrement: 1,
          },
        },
      });
    },
    {
      maxWait: 15000,
      timeout: 20000,
    }
  );

  revalidatePath("/reccs");
}