"use client"

import React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

type SiteHeaderProps = {
  title?: string
}

export function SiteHeader({ title }: SiteHeaderProps) {
  const pathname = usePathname()

  const pathArray = pathname.split("/").filter((p) => p !== "")
  const pathItems = pathArray.map((p, i) => {
    const isLast = i === pathArray.length - 1
    const href = `/${pathArray.slice(0, i + 1).join("/")}`
    const label = p.charAt(0).toUpperCase() + p.slice(1)

    return (
      <React.Fragment key={i}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage className="line-clamp-1">{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
      </React.Fragment>
    )
  })

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-8"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {title ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              pathItems
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
