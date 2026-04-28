import { AppSidebar } from "@/components/app-sidebar";
import ServerError from "@/components/porviders/ServerError";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { api } from "@/lib/api/api";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const { data } = await api.auth.me();

    return (
      <SidebarProvider>
        <AppSidebar user={data} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />

              <p>Dashboard</p>
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-muted">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  } catch (error) {
    return <ServerError error={error} />;
  }
}
