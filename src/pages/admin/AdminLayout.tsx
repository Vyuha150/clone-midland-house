import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users,
  Home,
  MessageSquare,
  Settings,
  BarChart3,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import useAuth from "@/context/useAuth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: "Overview",
      href: "/admin",
      icon: BarChart3,
      current: location.pathname === "/admin",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: location.pathname === "/admin/users",
    },
    {
      name: "Properties",
      href: "/admin/properties",
      icon: Home,
      current: location.pathname === "/admin/properties",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: TrendingUp,
      current: location.pathname === "/admin/analytics",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      current: location.pathname === "/admin/messages",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: location.pathname === "/admin/settings",
    },
  ];

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You need admin privileges to access this area.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative lg:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info - Fixed at bottom */}
        <div className="p-3 border-t flex-shrink-0">
          <Card className="p-3 text-center">
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </Card>
        </div>
      </div>

      {/* Main content area - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Mobile header */}
        <div className="flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>

        {/* Page content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
