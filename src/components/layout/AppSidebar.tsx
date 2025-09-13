import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Bell,
  FileText,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/datapulse/",
    icon: LayoutDashboard,
    description: "DataPulse Overview",
  },
  {
    title: "Users",
    url: "/datapulse/users",
    icon: Users,
    description: "User Management",
  },
  {
    title: "Analytics",
    url: "/datapulse/analytics",
    icon: BarChart3,
    description: "Data Analytics",
  },
  {
    title: "Reports",
    url: "/datapulse/reports",
    icon: FileText,
    description: "Data Reports",
  },
  {
    title: "Performance",
    url: "/datapulse/performance",
    icon: TrendingUp,
    description: "System Performance",
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "/datapulse/settings",
    icon: Settings,
    description: "DataPulse Configuration",
  },
  {
    title: "Notifications",
    url: "/datapulse/notifications",
    icon: Bell,
    description: "Alert Settings",
  },
];

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const collapsed = !open;
  const navClasses = (active: boolean) =>
    cn(
      "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring",
      active
        ? "bg-gradient-primary text-primary-foreground shadow-glow"
        : "text-sidebar-foreground"
    );

  const SidebarToggle = () => (
    <button
      onClick={toggleSidebar}
      className={cn(
        "absolute top-4 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full",
        "bg-background border border-border shadow-md",
        "hover:shadow-lg transition-all duration-200 hover-scale"
      )}
    >
      {!collapsed ? (
        <ChevronLeft className="h-3 w-3" />
      ) : (
        <ChevronRight className="h-3 w-3" />
      )}
    </button>
  );

  return (
    <Sidebar
      className={cn(
        "border-r border-sidebar-border bg-sidebar transition-all duration-300",
        !open ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarToggle />
      <SidebarContent className="px-3 py-6">
        {/* Logo Section */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-4 mb-6",
          !open && "justify-center"
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
          </div>
          {open && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-semibold tracking-tight">DataPulse</h1>
              <p className="text-xs text-muted-foreground">Analytics Platform</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
            !open && "sr-only"
          )}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className={`animate-fade-in delay-${index * 100}`}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => navClasses(isActive)}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              "group-hover:scale-110",
                              isActive && "animate-pulse-glow"
                            )}
                          />
                          {open && (
                            <div className="animate-fade-in">
                              <span>{item.title}</span>
                              <span className="block text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            </div>
                          )}
                          {isActive && (
                            <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-10 animate-pulse" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Navigation */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={cn(
            "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
            !open && "sr-only"
          )}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className={`animate-fade-in delay-${(index + 5) * 100}`}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => navClasses(isActive)}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            "group-hover:scale-110",
                            isActive && "animate-pulse-glow"
                          )} />
                          {open && (
                            <div className="animate-fade-in">
                              <span>{item.title}</span>
                              <span className="block text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}