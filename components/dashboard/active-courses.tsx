import { Plus, Globe } from "lucide-react"
import { CourseCard } from "@/app/dashboard/courses/course-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Course, Enrollment } from "@/app/generated/prisma/client"
import Link from "next/link"

type EnrollmentWithCourse = Enrollment & { course: Course }

export function ActiveCourses({
  enrollments = [],
}: {
  enrollments?: EnrollmentWithCourse[]
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">Active Courses</h3>
        <Button
          variant="link"
          className="px-0 text-primary hover:text-primary/80"
          asChild
        >
          <Link href="/dashboard/courses">View all</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <Globe className="h-6 w-6 text-muted-foreground/50 transition-colors group-hover:text-primary" />
              ) : undefined
            }
            compact
          />
        ))}
        {/* <!-- Add New Course Placeholder --> */}
        {/* <!-- Add New Course Placeholder --> */}
        <Card className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-dashed border-slate-300 bg-slate-50 text-center transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800">
          <CardContent className="flex flex-col items-center justify-center p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
              <Plus className="h-5 w-5" />
            </div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Enroll in Course
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Browse the catalog
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
