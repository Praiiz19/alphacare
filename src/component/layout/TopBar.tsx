import { Search, MapPin, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/useProfile";
import React from "react";

interface TopBarProps {
  location?: string;
}

const FCT_LOCATIONS = [
  "Abuja, Karu Site",
  "Garki",
  "Wuse",
  "Maitama",
  "Asokoro",
  "Gwarinpa",
  "Kubwa",
  "Nyanya",
  "Lugbe",
  "Jabi",
  "Utako",
  "Central Area",
];

export function TopBar({ location = "Abuja, Karu Site" }: TopBarProps) {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState(location);
  const { initials, notifications, markAllRead } = useProfile();
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-card border-b border-border">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors, clinics, specialties..."
            className="pl-10 bg-background"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value;
                navigate(`/search?q=${encodeURIComponent(value)}`);
              }
            }}
          />
        </div>
      </div>

      {/* Location & Actions */}
      <div className="flex items-center gap-4">
        <Select value={current} onValueChange={setCurrent}>
          <SelectTrigger className="w-[240px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <SelectValue placeholder="Select location" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {FCT_LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} className="flex-col items-start gap-1">
                <div className="flex items-center w-full justify-between">
                  <span className="text-sm font-medium">{n.title}</span>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(n.timestamp).toLocaleString()}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={markAllRead}>Mark all as read</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="w-9 h-9 cursor-pointer" onClick={() => navigate("/settings")}>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
