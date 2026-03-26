"use server"


import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { CreateUserFormValues, createUserSchema } from "./schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function createUserAction(data: CreateUserFormValues) {
  try {
    const validatedData = createUserSchema.parse(data)
    
    const count = validatedData.count || 1;
    let groupCode = "";

    if (validatedData.groupId) {
      const group = await prisma.group.findUnique({
        where: { id: validatedData.groupId }
      });
      if (group) {
        groupCode = group.code;
      }
    }

    const createdUsers: { email: string; password?: string, name: string }[] = [];

    for (let i = 0; i < count; i++) {
        let currentEmail = validatedData.email || "";
        let currentName = validatedData.name || "";
        let currentMemberId = "";

        if (count > 1) {
            currentMemberId = String(validatedData.startMemberId + i).padStart(2, '0');
            currentEmail = `${groupCode}${currentMemberId}@cbm.local`;
            currentName = `${groupCode}${currentMemberId}`;
        } else {
            currentMemberId = Math.random().toString(36).substring(2, 9);
        }

        const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!"

        const newUser = await auth.api.createUser({
            headers: await headers(),
            body: {
                email: currentEmail,
                password: tempPassword,
                name: currentName,
                role: validatedData.role.toLowerCase() === "admin" ? "admin" : "user",
                data: {
                  type: validatedData.role,
                },
            },
        });

        if (!newUser || !newUser.user) {
            throw new Error(`Failed to create user ${currentEmail}.`)
        }

        await prisma.user.update({
            where: { id: newUser.user.id },
            data: {
                type: validatedData.role,
                groupId: validatedData.groupId || null,
                memberId: currentMemberId,
            },
        })

        createdUsers.push({ email: currentEmail, password: tempPassword, name: currentName });
    }

    revalidatePath("/dashboard/users")

    return { 
      success: true, 
      users: createdUsers
    }
  } catch (error) {
    console.error("createUserAction Error:", error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "An unknown error occurred." }
  }
}
