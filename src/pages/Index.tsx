import { Card } from "@/components/ui/card";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MessageSquare, Flag, CheckCircle, AlertCircle, User, Mail, Calendar } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";


const adminData = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Super Admin",
  lastLogin: new Date().toLocaleDateString(),
  joinDate: "01/01/2024",
};

const stats = [
  {
    title: "Total Queries",
    value: "156",
    icon: MessageSquare,
    color: "text-blue-500",
  },
  {
    title: "Open Reports",
    value: "23",
    icon: Flag,
    color: "text-red-500",
  },
  {
    title: "Resolved Today",
    value: "45",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    title: "Pending Review",
    value: "12",
    icon: AlertCircle,
    color: "text-yellow-500",
  },
];

export default function Index() {
  const { theme, setTheme } = useTheme();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your platform's activity and metrics
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        {/* Admin Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{adminData.name}</h2>
              <p className="text-muted-foreground">{adminData.role}</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{adminData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Last Login: {adminData.lastLogin}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {adminData.joinDate}</span>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center gap-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}