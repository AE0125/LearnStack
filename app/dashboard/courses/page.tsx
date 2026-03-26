import { Globe } from "lucide-react"
import { CourseCard } from "./course-card"
import { CoursesToolbar } from "./courses-toolbar"
import { ExploreCard } from "./explore-card"
import { CoursesHeader } from "./courses-header"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <CoursesHeader />
      <CoursesToolbar />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {enrollments.map((enrollment) => (
          <CourseCard
            key={enrollment.id}
            id={enrollment.course.id}
            title={enrollment.course.title}
            code={enrollment.course.code || "N/A"}
            instructor={"LearnStack Tutor"}
            progress={enrollment.progress}
            imageUrl={enrollment.course.image || undefined}
            icon={
              !enrollment.course.image ? (
                <Globe className="h-10 w-10 text-muted-foreground/50 transition-colors group-hover:text-primary" />
              ) : undefined
            }
          />
        ))}

        <ExploreCard />
      </div>
    </div>
  )
}
