"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().optional(),
  description: z.string().optional(),
  length: z.string().optional(),
  literature: z.string().optional(),
  material: z.string().optional(),
  image: z.string().optional(),
})

export type CourseFormData = z.infer<typeof courseSchema>

export async function createCourse(data: CourseFormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  // Role check: Only ADMIN or TUTOR should create courses
  if (session.user.role !== "ADMIN" && session.user.role !== "TUTOR") {
    throw new Error("Forbidden: Insufficient privileges")
  }

  const parsed = courseSchema.parse(data)

  const course = await prisma.course.create({
    data: {
      ...parsed,
    },
  })

  revalidatePath("/dashboard/courses")
  return course.id
}

export async function updateCourse(id: string, data: CourseFormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  // Role check
  if (session.user.role !== "ADMIN" && session.user.role !== "TUTOR") {
    throw new Error("Forbidden: Insufficient privileges")
  }

  const parsed = courseSchema.parse(data)

  const course = await prisma.course.update({
    where: { id },
    data: {
      ...parsed,
    },
  })

  revalidatePath("/dashboard/courses")
  revalidatePath(`/dashboard/courses/${id}/edit`)
  return course.id
}
