"use client"

import * as React from "react"

import { NavMain } from "@/components/dashboard_template/nav-main"
import { NavSecondary } from "@/components/dashboard_template/nav-secondary"
import { NavUser } from "@/components/dashboard_template/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  CommandIcon,
  CalendarDaysIcon,
  NotebookTextIcon,
  Upload,
  UserIcon,
  UsersRound,
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: <NotebookTextIcon />,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: <CalendarDaysIcon />,
    },
    {
      title: "Upload",
      url: "/dashboard/upload",
      icon: <Upload className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: <DatabaseIcon />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: <FileIcon />,
    },
  ],
  navAdmin: [
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <UserIcon />,
    },
    {
      title: "Groups",
      url: "/dashboard/groups",
      icon: <UsersRound />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">LearnStack</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.navAdmin} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense>
          <NavUser />
        </React.Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}
