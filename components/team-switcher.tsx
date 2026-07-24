"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";

export function TeamSwitcher() {
  useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <PlusIcon />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Nexus Dashboard</span>
            <span className="truncate text-xs">Welcome!</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
