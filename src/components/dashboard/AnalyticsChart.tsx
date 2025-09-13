import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const userActivityData = [
  { name: "Jan", users: 4000, sessions: 2400 },
  { name: "Feb", users: 3000, sessions: 1398 },
  { name: "Mar", users: 2000, sessions: 9800 },
  { name: "Apr", users: 2780, sessions: 3908 },
  { name: "May", users: 1890, sessions: 4800 },
  { name: "Jun", users: 2390, sessions: 3800 },
  { name: "Jul", users: 3490, sessions: 4300 },
];

const revenueData = [
  { name: "Mon", revenue: 2400 },
  { name: "Tue", revenue: 1398 },
  { name: "Wed", revenue: 9800 },
  { name: "Thu", revenue: 3908 },
  { name: "Fri", revenue: 4800 },
  { name: "Sat", revenue: 3800 },
  { name: "Sun", revenue: 4300 },
];

const userRolesData = [
  { name: "Admin", value: 5, color: "hsl(262, 83%, 58%)" },
  { name: "Manager", value: 15, color: "hsl(250, 100%, 75%)" },
  { name: "User", value: 200, color: "hsl(240, 15%, 12%)" },
  { name: "Guest", value: 80, color: "hsl(240, 5%, 64%)" },
];

interface ChartProps {
  className?: string;
  delay?: number;
}

export function UserActivityChart({ className, delay = 0 }: ChartProps) {
  return (
    <Card className={cn(
      "glass border-card-border hover-scale",
      "transition-all duration-300",
      `animate-fade-in-up delay-${delay}`,
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Activity</CardTitle>
        <CardDescription>Active users and sessions over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userActivityData}>
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(250, 100%, 75%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(250, 100%, 75%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 15%, 12%)" />
            <XAxis dataKey="name" stroke="hsl(240, 5%, 64%)" />
            <YAxis stroke="hsl(240, 5%, 64%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 10%, 6%)",
                border: "1px solid hsl(240, 15%, 12%)",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px hsl(240 10% 4% / 0.4)",
              }}
              labelStyle={{ color: "hsl(240, 5%, 96%)" }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(262, 83%, 58%)"
              fillOpacity={1}
              fill="url(#userGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="hsl(250, 100%, 75%)"
              fillOpacity={1}
              fill="url(#sessionGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RevenueChart({ className, delay = 0 }: ChartProps) {
  return (
    <Card className={cn(
      "glass border-card-border hover-scale",
      "transition-all duration-300",
      `animate-fade-in-up delay-${delay}`,
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Revenue</CardTitle>
        <CardDescription>Revenue breakdown by day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 15%, 12%)" />
            <XAxis dataKey="name" stroke="hsl(240, 5%, 64%)" />
            <YAxis stroke="hsl(240, 5%, 64%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 10%, 6%)",
                border: "1px solid hsl(240, 15%, 12%)",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px hsl(240 10% 4% / 0.4)",
              }}
              labelStyle={{ color: "hsl(240, 5%, 96%)" }}
            />
            <Bar
              dataKey="revenue"
              fill="hsl(262, 83%, 58%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function UserRolesChart({ className, delay = 0 }: ChartProps) {
  return (
    <Card className={cn(
      "glass border-card-border hover-scale",
      "transition-all duration-300",
      `animate-fade-in-up delay-${delay}`,
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Roles</CardTitle>
        <CardDescription>Distribution of user roles</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userRolesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {userRolesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 10%, 6%)",
                border: "1px solid hsl(240, 15%, 12%)",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px hsl(240 10% 4% / 0.4)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}