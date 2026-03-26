import { AppSidebar } from "@/components/dashboard_template/app-sidebar"
import { SiteHeader } from "@/components/dashboard_template/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { UploadForm } from "@/components/upload/upload-form"

export default async function UploadPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect("/login")

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight">Upload Files</h1>
        <p className="mb-6 text-muted-foreground">
          Upload documents, resources, or any other files to the LearnStack
          storage.
        </p>
        <UploadForm />
      </div>
    </div>
  )
}
