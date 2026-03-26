"use server"

import { createGroup } from "@/services/group.service"
import { revalidatePath } from "next/cache"

export async function createGroupAction(formData: FormData) {
  const code = formData.get("code") as string
  const color = formData.get("color") as string | null

  if (!code || code.trim() === "") {
    throw new Error("Group code is required")
  }

  try {
    await createGroup({
      code: code.trim(),
      color: color && color.trim() !== "" ? color.trim() : undefined,
    })

    revalidatePath("/dashboard/groups")
    revalidatePath("/dashboard/users")
  } catch (error) {
    console.error("Failed to create group:", error)
    // In a real app we might return an error state from the action,
    // but throwing here prevents a silent failure.
    throw new Error("Failed to create group, maybe the code already exists.")
  }
}
