import { useState, useEffect } from "react";
import { TrendingUp, Activity, Clock, Zap, Server, Database, Globe, Cpu, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/ui/stat-card";
import { useToast } from "@/hooks/use-toast";

const performanceMetrics = [
  {
    title: "Response Time",
    value: "245ms",
    change: "-12%",
    changeType: "positive",
    icon: Clock,
    description: "Average API response time",
    status: "Good"
  },
  {
    title: "Uptime",
    value: "99.9%",
    change: "+0.1%",
    changeType: "positive",
    icon: Activity,
    description: "System availability",
    status: "Excellent"
  },
  {
    title: "Throughput",
    value: "1,247",
    change: "+8%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Requests per second",
    status: "Good"
  },
  {
    title: "Error Rate",
    value: "0.02%",
    change: "-0.01%",
    changeType: "positive",
    icon: Zap,
    description: "Failed requests percentage",
    status: "Excellent"
  }
];

const systemMetrics = [
  {
    name: "CPU Usage",
    value: 45,
    max: 100,
    unit: "%",
    status: "Good",
    trend: "stable"
  },
  {
    name: "Memory Usage",
    value: 67,
    max: 100,
    unit: "%",
    status: "Warning",
    trend: "increasing"
  },
  {
    name: "Disk Usage",
    value: 23,
    max: 100,
    unit: "%",
    status: "Good",
    trend: "stable"
  },
  {
    name: "Network I/O",
    value: 34,
    max: 100,
    unit: "%",
    status: "Good",
    trend: "stable"
  }
];

const recentAlerts = [
  {
    id: 1,
    type: "Warning",
    message: "Memory usage exceeded 80%",
    timestamp: "2 minutes ago",
    resolved: false
  },
  {
    id: 2,
    type: "Info",
    message: "Scheduled maintenance completed",
    timestamp: "1 hour ago",
    resolved: true
  },
  {
    id: 3,
    type: "Error",
    message: "Database connection timeout",
    timestamp: "3 hours ago",
    resolved: true
  },
  {
    id: 4,
    type: "Warning",
    message: "High CPU usage detected",
    timestamp: "5 hours ago",
    resolved: true
  }
];

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("1h");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    responseTime: 245,
    uptime: 99.9,
    throughput: 1247,
    errorRate: 0.02
  });
  const [systemMetrics, setSystemMetrics] = useState([
    { name: "CPU Usage", value: 45, max: 100, unit: "%", status: "Good", trend: "stable" },
    { name: "Memory Usage", value: 67, max: 100, unit: "%", status: "Warning", trend: "increasing" },
    { name: "Disk Usage", value: 23, max: 100, unit: "%", status: "Good", trend: "stable" },
    { name: "Network I/O", value: 34, max: 100, unit: "%", status: "Good", trend: "stable" }
  ]);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "Warning", message: "Memory usage exceeded 80%", timestamp: "2 minutes ago", resolved: false },
    { id: 2, type: "Info", message: "Scheduled maintenance completed", timestamp: "1 hour ago", resolved: true },
    { id: 3, type: "Error", message: "Database connection timeout", timestamp: "3 hours ago", resolved: true },
    { id: 4, type: "Warning", message: "High CPU usage detected", timestamp: "5 hours ago", resolved: true }
  ]);
  const { toast } = useToast();

  // Simulate real-time performance updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        responseTime: Math.max(100, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 20)),
        uptime: Math.max(99.0, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1)),
        throughput: Math.max(800, Math.min(2000, prev.throughput + (Math.random() - 0.5) * 100)),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.5))
      }));

      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Performance metrics have been updated",
      });
    }, 1500);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Time Range Updated",
        description: `Performance data updated for ${value}`,
      });
    }, 1000);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleResolveAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved",
    });
  };

  const handleCreateAlert = () => {
    const newAlert = {
      id: Math.max(...alerts.map(a => a.id)) + 1,
      type: "Info" as const,
      message: "Manual alert created by user",
      timestamp: "Just now",
      resolved: false
    };
    setAlerts(prev => [newAlert, ...prev]);
    toast({
      title: "Alert Created",
      description: "New alert has been added to the system",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-scale-in">System Performance</h1>
          <p className="text-muted-foreground animate-fade-in delay-100">Monitor DataPulse platform performance and system health metrics</p>
        </div>
        <div className="flex items-center gap-2 animate-fade-in delay-200">
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={isLoading}
            className="hover-scale"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32 hover-scale">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">Last 15 min</SelectItem>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleCreateAlert} className="hover-scale">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Response Time"
          value={`${realTimeMetrics.responseTime.toFixed(0)}ms`}
          change="-12%"
          changeType="positive"
          description="Real-time API response"
          icon={Clock}
          delay={300}
        />
        <StatCard
          title="Uptime"
          value={`${realTimeMetrics.uptime.toFixed(1)}%`}
          change="+0.1%"
          changeType="positive"
          description="System availability"
          icon={Activity}
          delay={400}
        />
        <StatCard
          title="Throughput"
          value={realTimeMetrics.throughput.toLocaleString()}
          change="+8%"
          changeType="positive"
          description="Requests per second"
          icon={TrendingUp}
          delay={500}
        />
        <StatCard
          title="Error Rate"
          value={`${realTimeMetrics.errorRate.toFixed(2)}%`}
          change="-0.01%"
          changeType="positive"
          description="Failed requests"
          icon={Zap}
          delay={600}
        />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trend</CardTitle>
                <CardDescription>API response times over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                    <p className="text-sm">Integration with monitoring service needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>Number of requests per minute</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                    <p className="text-sm">Integration with monitoring service needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {systemMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {metric.name}
                    <Badge 
                      variant={metric.status === 'Good' ? 'default' : metric.status === 'Warning' ? 'destructive' : 'secondary'}
                    >
                      {metric.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {metric.trend === 'increasing' ? 'Trending up' : metric.trend === 'decreasing' ? 'Trending down' : 'Stable'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{metric.value.toFixed(1)}{metric.unit}</span>
                      <span className="text-muted-foreground">of {metric.max}{metric.unit}</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
              <CardDescription>Real-time system resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <Server className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-muted-foreground">Active Servers</div>
                </div>
                <div className="text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Database Connections</div>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">CDN Nodes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Real-time system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.type === 'Error' ? 'bg-red-500' : 
                        alert.type === 'Warning' ? 'bg-yellow-500' : 
                        'bg-blue-500'
                      }`} />
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-muted-foreground">{alert.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={alert.resolved ? 'default' : 'destructive'}>
                        {alert.resolved ? 'Resolved' : 'Active'}
                      </Badge>
                      {!alert.resolved && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">[2024-01-25 14:30:15]</span>
                  <Badge variant="outline" className="text-xs">INFO</Badge>
                  <span>Server started successfully on port 3000</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">[2024-01-25 14:25:42]</span>
                  <Badge variant="destructive" className="text-xs">ERROR</Badge>
                  <span>Database connection timeout after 30 seconds</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">[2024-01-25 14:20:18]</span>
                  <Badge variant="secondary" className="text-xs">WARN</Badge>
                  <span>Memory usage exceeded 80% threshold</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">[2024-01-25 14:15:33]</span>
                  <Badge variant="outline" className="text-xs">INFO</Badge>
                  <span>User authentication successful for user@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">[2024-01-25 14:10:07]</span>
                  <Badge variant="outline" className="text-xs">INFO</Badge>
                  <span>API endpoint /api/users accessed 150 times in the last hour</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
