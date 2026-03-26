import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { WelcomeHeader } from "@/components/dashboard/welcome-header"
import { UpNextBanner } from "@/components/dashboard/up-next-banner"
import { ActiveCourses } from "@/components/dashboard/active-courses"
import { Schedule } from "@/components/dashboard/schedule"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect("/login")

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
    take: 4,
  })

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="mx-auto w-full max-w-7xl flex-1 p-6 lg:p-10">
            <WelcomeHeader userName={session.user?.name} />
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
              <div className="space-y-8 xl:col-span-2">
                <UpNextBanner />
                <ActiveCourses enrollments={enrollments} />
              </div>
              <Schedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
