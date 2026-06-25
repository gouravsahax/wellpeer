"use server";

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache';

export async function getProfile() {
    const session = await auth();

    if(!session?.user) {
        return null;
    }

    try{
        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id
            }
        })
        return user
    } catch {
        throw new Error("Error in fetching user data");
    }
}

export async function updateProfileName(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const name = String(formData.get("name") ?? "").trim();
    if (!name) {
        throw new Error("Name cannot be empty");
    }

    try {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name,
            },
        });
        revalidatePath("/profile");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update profile name");
    }
}
