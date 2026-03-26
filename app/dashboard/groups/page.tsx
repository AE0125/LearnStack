import { Button } from "@/components/ui/button"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  PlusCircle,
  Info,
  MoreVertical,
  Filter,
  Users,
  Edit2,
} from "lucide-react"
import { getGroups } from "@/services/group.service"
import { createGroupAction } from "./actions"
import { GroupDetailsDialog } from "./group-details-dialog"

export default async function GroupsPage() {
  const groups = await getGroups()

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground">
            Manage student groups and class cohorts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Group Creation Form */}
        <div className="space-y-6">
          <Card>
            <form action={createGroupAction}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  New Group
                </CardTitle>
                <CardDescription>
                  Create a new group to assign students.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Group Code</Label>
                  <Input id="code" name="code" placeholder="e.g. CS-101" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      name="color"
                      type="color"
                      defaultValue="#3b82f6"
                      className="h-10 w-16 p-1 cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Create Group
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Info className="mt-0.5 h-5 w-5 text-primary" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Quick Tip</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Groups allow you to organize students into cohorts. The color helps identify them visually in the user table.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Groups List */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg">All Groups</div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Code</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="font-medium"
                        style={{
                          backgroundColor: group.color || undefined,
                          color: group.color ? "white" : undefined,
                        }}
                      >
                        {group.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{group.users.length} members</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {group.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <GroupDetailsDialog group={group}>
                          <Button variant="ghost" size="icon" title="View Details">
                            <Info className="h-4 w-4" />
                          </Button>
                        </GroupDetailsDialog>
                        <Button variant="ghost" size="icon" title="Edit Group">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {groups.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No groups found. Create your first group on the left.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}
