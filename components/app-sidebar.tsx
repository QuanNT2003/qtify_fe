"use client";

import * as React from "react";
import {
  Home,
  Compass,
  Library,
  ChartNoAxesCombined,
  Heart,
  Music2,
  Mic2,
  ListMusic,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const data = {
  mainNav: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Compass,
    },
    {
      title: "Trend",
      url: "/trend",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Radio",
      url: "/radio",
      icon: Mic2,
    },
  ],
  library: [
    {
      title: "Library",
      url: "/library",
      icon: Library,
    },
    {
      title: "Recent",
      url: "/recent",
      icon: ListMusic,
    },
    {
      title: "Liked Songs",
      url: "/liked",
      icon: Heart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-sidebar "
      {...props}
    >
      <SidebarHeader className="h-16 flex items-center px-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Music2 className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-bold text-xl tracking-tight">Qtify</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarMenu>
            {data.mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname === item.url}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Your Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.library.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <User className="size-5" />
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Guest User</span>
                <span className="text-xs text-muted-foreground">
                  Free Account
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
