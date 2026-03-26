import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { CourseForm } from "../../_components/course-form"
import prisma from "@/lib/prisma"

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Auth & Role check
  if (!session) redirect("/login")
  if (session.user.role !== "ADMIN" && session.user.role !== "TUTOR") {
    redirect("/dashboard/courses?error=unauthorized")
  }

  const { id } = await params
  
  const course = await prisma.course.findUnique({
    where: { id }
  })

  if (!course) {
    redirect("/dashboard/courses?error=not_found")
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kurs bearbeiten: {course.title}</h1>
        <p className="text-muted-foreground mt-1">
          Aktualisiere die Informationen und Kursdetails.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <CourseForm initialData={course} />
      </div>
    </div>
  )
}
