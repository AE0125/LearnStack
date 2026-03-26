import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { CourseForm } from "../_components/course-form"

export default async function NewCoursePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Auth & Role check
  if (!session) redirect("/login")
  if (session.user.role !== "ADMIN" && session.user.role !== "TUTOR") {
    redirect("/dashboard/courses?error=unauthorized")
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Neuen Kurs erstellen</h1>
        <p className="text-muted-foreground mt-1">
          Fülle die Details aus, um einen neuen Kurs mithilfe des Editors anzulegen.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <CourseForm />
      </div>
    </div>
  )
}
