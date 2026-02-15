"use client";

import * as React from "react";
import {
  Home,
  Compass,
  Library,
  PlusCircle,
  Heart,
  Music2,
  Mic2,
  ListMusic,
  User,
} from "lucide-react";

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
      isActive: true,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Compass,
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
  playlists: [
    {
      title: "My Playlist #1",
      url: "/playlist/1",
      icon: Music2,
    },
    {
      title: "Chill Vibes",
      url: "/playlist/2",
      icon: Music2,
    },
    {
      title: "Workout Mix",
      url: "/playlist/3",
      icon: Music2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                  isActive={item.isActive}
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
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
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 py-2">
            <SidebarGroupLabel className="px-0">Playlists</SidebarGroupLabel>
            <PlusCircle className="size-4 cursor-pointer hover:text-primary transition-colors" />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.playlists.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span className="truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
