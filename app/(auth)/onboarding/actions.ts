"use server"

import { Role } from "@/app/generated/prisma/enums"
import prisma from "@/lib/prisma"

export async function promoteFirstUserToAdmin(userId: string) {
  const count = await prisma.user.count()
  
  // Extra security to ensure it only promotes if it's the solitary user
  if (count === 1) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "admin",
        type: Role.ADMIN,
      },
    })
    return { success: true }
  }
  
  return { success: false, error: "Cannot promote user: other users exist" }
}
