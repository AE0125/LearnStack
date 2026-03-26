"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Users, Mail } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
}

type GroupWithUsers = {
  id: string
  code: string
  color: string | null
  createdAt: Date
  users: User[]
}

export function GroupDetailsDialog({
  group,
  children,
}: {
  group: GroupWithUsers
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-2">
              Group Details
              <Badge
                variant="outline"
                className="font-medium px-2 py-0.5"
                style={{
                  backgroundColor: group.color || undefined,
                  color: group.color ? "white" : undefined,
                }}
              >
                {group.code}
              </Badge>
            </DialogTitle>
          </div>
          <DialogDescription>
            Created on {new Date(group.createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2 font-medium">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Members ({group.users.length})</span>
          </div>

          {group.users.length > 0 ? (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {group.users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col rounded-md border p-3 bg-card"
                >
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border p-4 text-center text-sm text-muted-foreground bg-muted/20">
              No members are currently in this group.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
