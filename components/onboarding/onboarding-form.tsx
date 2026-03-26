"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FieldError } from "@/components/ui/field"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { promoteFirstUserToAdmin } from "@/app/(auth)/onboarding/actions"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Valid email is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

export function OnboardingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)

    const res = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    })

    if (res.error) {
      setError(res.error.message || "Something went wrong.")
    } else if (res.data?.user) {
      const promoteRes = await promoteFirstUserToAdmin(res.data.user.id)
      if (!promoteRes.success) {
        setError(promoteRes.error || "Failed to promote to admin.")
      } else {
        router.push("/dashboard")
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 md:p-8"
            noValidate
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome to LearnStack</h1>
                <p className="text-balance text-muted-foreground">
                  Create the first administrator account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...form.register("name")}
                />
                <FieldError
                  errors={
                    form.formState.errors.name
                      ? [form.formState.errors.name]
                      : undefined
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  {...form.register("email")}
                />
                <FieldError
                  errors={
                    form.formState.errors.email
                      ? [form.formState.errors.email]
                      : undefined
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                />
                <FieldError
                  errors={
                    form.formState.errors.password
                      ? [form.formState.errors.password]
                      : undefined
                  }
                />
              </Field>
              <Field>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </Field>
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
