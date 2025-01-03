import { LayoutDashboard, MessageSquare, Flag, Users, Bell, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "User Queries", icon: MessageSquare, path: "/queries" },
  { title: "User Reports", icon: Flag, path: "/reports" },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Add any logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-4 py-2">
        <Bell className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">Admin Portal</span>
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto p-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}