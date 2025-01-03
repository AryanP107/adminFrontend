import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}