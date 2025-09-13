import { useState } from "react";
import { Bell, Search, Settings, User, LogOut, HelpCircle, CheckCheck, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "warning" | "error";
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New DataPulse user",
    description: "Sarah Johnson joined the platform",
    time: "2 min ago",
    unread: true,
    type: "success",
  },
  {
    id: 2,
    title: "DataPulse performance alert",
    description: "System CPU usage above 85%",
    time: "5 min ago",
    unread: true,
    type: "warning",
  },
  {
    id: 3,
    title: "DataPulse subscription renewed",
    description: "$2,500 premium plan activated",
    time: "10 min ago",
    unread: false,
    type: "success",
  },
  {
    id: 4,
    title: "DataPulse maintenance",
    description: "Scheduled platform maintenance in 2 hours",
    time: "1 hour ago",
    unread: true,
    type: "info",
  },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);
  const { toast } = useToast();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "DataPulse Search",
        description: `Searching DataPulse for: ${searchQuery}`,
      });
    }
  };

  const handleProfileClick = () => {
    window.location.href = "/datapulse/profile";
  };

  const handleSettingsClick = () => {
    window.location.href = "/datapulse/settings";
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out.",
      variant: "destructive",
    });
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border",
      "bg-background/80 backdrop-blur-md glass"
    )}>
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
        
        {/* Search */}
        <div className="flex flex-1 items-center gap-4">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search DataPulse data, users, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 bg-background-secondary border-border",
                "focus:ring-primary focus:border-primary",
                "hover:shadow-md transition-all duration-200"
              )}
            />
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative hover-scale hover-glow",
                  "transition-all duration-200"
                )}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className={cn(
                      "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center",
                      "text-xs animate-pulse-glow"
                    )}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={cn(
                "w-80 glass border-glass-border",
                "animate-scale-in"
              )}
            >
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="h-6 px-2 text-xs"
                    >
                      <CheckCheck className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start gap-1 p-3 cursor-pointer",
                      "hover:bg-accent/50 transition-colors duration-200",
                      notification.unread && "bg-accent/20"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex w-full items-start justify-between">
                      <div className="grid gap-1 flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </DropdownMenuItem>
                ))}
                {notifications.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="hover-scale hover-glow transition-all duration-200"
            onClick={handleSettingsClick}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "relative h-10 w-10 rounded-full hover-scale",
                  "transition-all duration-200"
                )}
              >
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={cn(
                "w-56 glass border-glass-border",
                "animate-scale-in"
              )}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">DataPulse Admin</p>
                  <p className="text-xs text-muted-foreground">
                    admin@datapulse.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-accent/50 transition-colors duration-200"
                onClick={handleProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-accent/50 transition-colors duration-200"
                onClick={handleSettingsClick}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent/50 transition-colors duration-200">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-destructive/50 transition-colors duration-200"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}