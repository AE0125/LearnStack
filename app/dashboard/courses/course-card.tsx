import Image from "next/image"
import { User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CourseCardProps {
  id: string
  title: string
  code: string
  instructor: string
  progress: number
  imageUrl?: string | null
  imageAlt?: string | null
  icon?: React.ReactNode
  compact?: boolean
}

export function CourseCard({
  title,
  code,
  instructor,
  progress,
  imageUrl,
  imageAlt,
  icon,
  compact = false,
}: CourseCardProps) {
  return (
    <Card className="group flex cursor-pointer flex-col overflow-hidden transition-all hover:shadow-md">
      <div className={`relative flex ${compact ? 'h-24' : 'h-40'} items-center justify-center overflow-hidden bg-muted`}>
        {imageUrl ? (
          <Image
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            src={imageUrl}
            fill
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-muted to-muted/50" />
            <div className="z-10 h-10 w-10 flex items-center justify-center text-muted-foreground/50 transition-colors group-hover:text-primary">
              {icon}
            </div>
          </>
        )}
          <Badge variant="secondary" className="absolute right-2 top-2 z-10">
          {code}
        </Badge>
      </div>
      <CardHeader className={`flex-1 ${compact ? 'p-3 pb-2' : 'p-4 pb-2'}`}>
        <CardTitle className={`line-clamp-2 ${compact ? 'text-sm' : 'text-base'} transition-colors group-hover:text-primary`}>
          {title}
        </CardTitle>
        <CardDescription className={`mt-2 flex items-center gap-1.5 ${compact ? 'text-xs' : ''}`}>
          <User className="h-3.5 w-3.5" />
          {instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className={`${compact ? 'p-3 pt-0' : 'p-4 pt-0'}`}>
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2" />
          <span className="w-8 text-right text-xs font-medium text-muted-foreground">
            {progress}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
