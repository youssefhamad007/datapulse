import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";
import { DashboardWidget } from "@/components/dashboard/DashboardWidget";
import { UserActivityChart, RevenueChart, UserRolesChart } from "@/components/dashboard/AnalyticsChart";
import { UserTable } from "@/components/dashboard/UserTable";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in p-4 md:p-0">
      {/* Page Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight animate-scale-in">DataPulse Dashboard</h1>
        <p className="text-muted-foreground animate-fade-in delay-100">Real-time analytics and performance insights</p>
      </div>
      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-fade-in-up delay-0">
          <DashboardWidget
            title="Total Users"
            value="2,847"
            change="+12%"
            changeType="positive"
            description="from last month"
            icon={Users}
            delay={0}
          />
        </div>
        <div className="animate-fade-in-up delay-100">
          <DashboardWidget
            title="Revenue"
            value="$45,231"
            change="+8%"
            changeType="positive"
            description="from last month"
            icon={DollarSign}
            delay={100}
          />
        </div>
        <div className="animate-fade-in-up delay-200">
          <DashboardWidget
            title="Active Sessions"
            value="1,423"
            change="+5%"
            changeType="positive"
            description="from last hour"
            icon={Activity}
            delay={200}
          />
        </div>
        <div className="animate-fade-in-up delay-300">
          <DashboardWidget
            title="Growth Rate"
            value="23.5%"
            change="-2%"
            changeType="negative"
            description="from last week"
            icon={TrendingUp}
            delay={300}
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="animate-fade-in-up delay-400">
          <UserActivityChart delay={400} />
        </div>
        <div className="animate-fade-in-up delay-500">
          <RevenueChart delay={500} />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in-up delay-600">
          <UserTable delay={600} />
        </div>
        <div className="animate-fade-in-up delay-700">
          <UserRolesChart delay={700} />
        </div>
      </div>
    </div>
  );
}