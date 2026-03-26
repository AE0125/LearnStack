import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ExploreCard() {
  return (
    <Card className="group flex cursor-pointer flex-col overflow-hidden border-2 border-dashed bg-muted/30 transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-md">
      <CardContent className="flex min-h-[280px] flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors group-hover:text-primary">
          <Plus className="h-6 w-6" />
        </div>
        <h3 className="mb-1 text-lg font-semibold">Explore Catalog</h3>
        <p className="text-sm text-muted-foreground">
          Find new courses to enroll in
        </p>
      </CardContent>
    </Card>
  )
}
