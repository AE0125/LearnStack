"use client"

import { useState } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PlusCircle, Loader2, Copy } from "lucide-react"
import { toast } from "sonner"
import { createUserSchema, CreateUserFormValues } from "./schema"
import GroupPicker from "./group-picker"
import { Group } from "@/app/generated/prisma/client"
import { createUserAction } from "./actions"

export default function CreateUserForm({ groups }: { groups: Group[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; password?: string }[] | null>(null)

  const form = useForm<CreateUserFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createUserSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      role: "STUDENT",
      groupId: null,
      count: 1,
      startMemberId: 1,
    },
  })

  const count = useWatch({
    control: form.control,
    name: "count",
  })

  const groupId = useWatch({
    control: form.control,
    name: "groupId",
  })

  const startMemberId = useWatch({
    control: form.control,
    name: "startMemberId",
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    setIsSubmitting(true)
    try {
      const res = await createUserAction(data as CreateUserFormValues)
      if (res?.success && res.users) {
        toast.success(res.users.length > 1 ? `${res.users.length} users created successfully!` : "User created successfully!")
        setCreatedCredentials(res.users)
        form.reset()
      } else {
        toast.error("Error: " + res?.error)
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const {
    formState: { errors },
  } = form

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            New User Account
          </CardTitle>
          <CardDescription>
            Manually add a single user to the platform.
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="count">Number of Users</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={50}
                  {...form.register("count")}
                />
                {errors.count && (
                  <p className="text-xs text-destructive">{errors.count.message}</p>
                )}
              </div>
              {count > 1 && (
                <div className="space-y-2">
                  <Label htmlFor="startMemberId">Start Member ID</Label>
                  <Input
                    id="startMemberId"
                    type="number"
                    min={1}
                    {...form.register("startMemberId")}
                  />
                  {errors.startMemberId && (
                    <p className="text-xs text-destructive">{errors.startMemberId.message}</p>
                  )}
                </div>
              )}
            </div>

            {count <= 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...form.register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@university.edu"
                    {...form.register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="TUTOR">Instructor</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-xs text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2 pt-px">
                <Label htmlFor="dept">Department</Label>
                <Controller
                  name="groupId"
                  control={form.control}
                  render={({ field }) => {
                    const selectedGroup =
                      groups.find((g) => g.id === field.value) || null
                    return (
                      <GroupPicker
                        groups={groups}
                        value={selectedGroup}
                        onValueChange={(group) =>
                          field.onChange(group?.id || null)
                        }
                      />
                    )
                  }}
                />
                {errors.groupId && (
                  <p className="text-xs text-destructive">
                    {errors.groupId.message}
                  </p>
                )}
              </div>
            </div>

            {count > 1 && groupId && (
              <div className="rounded-md bg-muted p-4 text-sm mt-4 text-muted-foreground">
                <strong>Email Preview:</strong><br />
                {(() => {
                  const group = groups.find((g) => g.id === groupId)
                  const code = group ? group.code : ""
                  const start = String(startMemberId).padStart(2, '0')
                  const end = String(Number(startMemberId) + Number(count) - 1).padStart(2, '0')
                  return `${code}${start}@cbm.local - ${code}${end}@cbm.local`
                })()}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={!!createdCredentials} onOpenChange={(open) => !open && setCreatedCredentials(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User{createdCredentials && createdCredentials.length > 1 ? "s" : ""} Created Successfully</DialogTitle>
            <DialogDescription>
              Please save these login credentials. The passwords will only be shown once.
            </DialogDescription>
          </DialogHeader>
          {createdCredentials && (
            <div className="space-y-4 py-4">
              {createdCredentials.length === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="flex items-center gap-2">
                      <Input readOnly value={createdCredentials[0].email} />
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(createdCredentials[0].email)
                          toast.success("Email copied to clipboard")
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Temporary Password</Label>
                    <div className="flex items-center gap-2">
                      <Input readOnly value={createdCredentials[0].password || ""} />
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(createdCredentials[0].password || "")
                          toast.success("Password copied to clipboard")
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Password</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {createdCredentials.map((c, i) => (
                        <TableRow key={i}>
                          <TableCell>{c.email}</TableCell>
                          <TableCell className="font-mono">{c.password}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {createdCredentials && createdCredentials.length > 1 && (
              <Button variant="outline" onClick={() => {
                const csv = "Email,Password\n" + createdCredentials.map(c => `${c.email},${c.password}`).join("\n");
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'credentials.csv';
                a.click();
              }}>
                Download CSV
              </Button>
            )}
            <Button onClick={() => setCreatedCredentials(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
