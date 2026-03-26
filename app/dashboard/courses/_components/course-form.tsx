"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/editor/rich-text-editor"
import { createCourse, updateCourse } from "@/app/actions/courses"
import { Course } from "@/app/generated/prisma/client"

const courseSchema = z.object({
  title: z.string().min(1, "Kurstitel wird benötigt"),
  code: z.string().optional(),
  length: z.string().optional(),
  literature: z.string().optional(),
  material: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
})

type CourseFormData = z.infer<typeof courseSchema>

interface CourseFormProps {
  initialData?: Course | null
}

export function CourseForm({ initialData }: CourseFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: initialData?.title || "",
      code: initialData?.code || "",
      length: initialData?.length || "",
      literature: initialData?.literature || "",
      material: initialData?.material || "",
      image: initialData?.image || "",
      description: initialData?.description || "",
    },
  })

  // Watch the description value for the RichTextEditor
  const descriptionValue = watch("description") ?? ""

  const onSubmit = async (data: CourseFormData) => {
    try {
      setLoading(true)
      setError(null)
      
      if (initialData) {
        await updateCourse(initialData.id, data)
      } else {
        await createCourse(data)
      }
      
      router.push("/dashboard/courses")
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Es ist ein Fehler aufgetreten")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Kurs-Name <span className="text-red-500">*</span></label>
          <Input {...register("title")} placeholder="Z.B. Advanced UI Design" />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Kurs-Kürzel</label>
          <Input {...register("code")} placeholder="Z.B. CS-401" />
        </div>

        {/* Length */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Länge / Dauer</label>
          <Input {...register("length")} placeholder="Z.B. 10 Wochen" />
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Titelbild (URL)</label>
          <Input {...register("image")} placeholder="https://..." />
        </div>

        {/* Literature */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Literatur</label>
          <Input {...register("literature")} placeholder="Buch A, Buch B, ..." />
        </div>

        {/* Material - Could trigger an upload, using URL string for simplicity */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Unterrichtsmaterial (Link)</label>
          <Input {...register("material")} placeholder="Dropbox / Google Drive Link..." />
        </div>
        
        {/* Description - Slate.js RichTextEditor */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Kursbeschreibung</label>
          <RichTextEditor 
            value={descriptionValue} 
            onChange={(val) => {
              setValue("description", val, { shouldValidate: true, shouldDirty: true })
            }} 
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      <div className="flex items-center gap-4 justify-end pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/dashboard/courses")}
          disabled={loading}
        >
          Abbrechen
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Speichere..." : (initialData ? "Kurs aktualisieren" : "Kurs erstellen")}
        </Button>
      </div>
    </form>
  )
}
