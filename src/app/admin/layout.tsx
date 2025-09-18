"use client";

import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { authClient } from "~/server/auth/client";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  if (!data && !isPending) return redirect("/login");
  if (data?.user.role !== "admin" && !isPending) return redirect("/");

  if (isPending) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">{children}</SidebarInset>
    </SidebarProvider>
  );
}
