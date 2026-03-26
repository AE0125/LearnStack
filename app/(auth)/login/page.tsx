import { LoginForm } from "@/components/login/login-form"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const usersCount = await prisma.user.count()
  
  if (usersCount === 0) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
