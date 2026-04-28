"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@/lib/api/types/user";
import { getRoutes } from "@/lib/get-routes";
import { NavGeneral } from "./nav-projects";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const route = getRoutes(user.role);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavGeneral projects={route.general} />
        <NavMain items={route.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
