import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutGrid, Calendar, MessageSquare, Heart, Settings, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const navItems = [
  { icon: LayoutGrid, label: "Discovery", path: "/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0",
        className
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-healthcare flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">MediFind</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4">
        <div className="p-4 rounded-xl bg-accent">
          <h4 className="font-semibold text-foreground mb-1">
            Upgrade to Premium
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Get priority support and analytics.
          </p>
          <Button size="sm" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
          <LogOut className="w-4 h-4" />
          Log out
        </Button>
      </div>
    </aside>
  );
}
