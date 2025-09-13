import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, Users, DollarSign, Activity, Eye, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const analyticsData = {
  overview: {
    totalUsers: 2847,
    totalRevenue: 45231,
    totalSessions: 1423,
    conversionRate: 23.5
  },
  metrics: [
    {
      title: "Page Views",
      value: "45,231",
      change: "+12%",
      changeType: "positive",
      icon: Eye,
      description: "from last month"
    },
    {
      title: "Unique Visitors",
      value: "12,847",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      description: "from last month"
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      description: "from last month"
    },
    {
      title: "Bounce Rate",
      value: "23.5%",
      change: "-2%",
      changeType: "negative",
      icon: Activity,
      description: "from last week"
    }
  ],
  chartData: [
    { month: "Jan", users: 1200, revenue: 12000 },
    { month: "Feb", users: 1400, revenue: 15000 },
    { month: "Mar", users: 1600, revenue: 18000 },
    { month: "Apr", users: 1800, revenue: 22000 },
    { month: "May", users: 2000, revenue: 25000 },
    { month: "Jun", users: 2400, revenue: 30000 },
    { month: "Jul", users: 2800, revenue: 35000 },
    { month: "Aug", users: 3200, revenue: 40000 },
    { month: "Sep", users: 3600, revenue: 45000 },
    { month: "Oct", users: 4000, revenue: 50000 },
    { month: "Nov", users: 4200, revenue: 52000 },
    { month: "Dec", users: 4500, revenue: 55000 }
  ],
  topPages: [
    { page: "/dashboard", views: 12543, uniqueVisitors: 8234, bounceRate: "12%" },
    { page: "/products", views: 9876, uniqueVisitors: 6543, bounceRate: "18%" },
    { page: "/about", views: 7654, uniqueVisitors: 5432, bounceRate: "25%" },
    { page: "/contact", views: 5432, uniqueVisitors: 4321, bounceRate: "30%" },
    { page: "/pricing", views: 4321, uniqueVisitors: 3210, bounceRate: "22%" }
  ]
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    pageViews: 45231,
    uniqueVisitors: 12847,
    revenue: 45231,
    bounceRate: 23.5
  });
  const { toast } = useToast();

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        pageViews: prev.pageViews + Math.floor(Math.random() * 10),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 5),
        revenue: prev.revenue + Math.floor(Math.random() * 50),
        bounceRate: Math.max(15, Math.min(35, prev.bounceRate + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `datapulse-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setIsLoading(false);
      toast({
        title: "Export Complete",
        description: "Analytics data has been downloaded successfully",
      });
    }, 2000);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data Updated",
        description: `Analytics data refreshed for ${value}`,
      });
    }, 1000);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Analytics data has been updated",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-scale-in">Data Analytics</h1>
          <p className="text-muted-foreground animate-fade-in delay-100">Advanced analytics and data insights for DataPulse platform</p>
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
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleExport} 
            disabled={isLoading}
            className="hover-scale"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Page Views"
          value={realTimeData.pageViews.toLocaleString()}
          change="+12%"
          changeType="positive"
          description="Real-time page views"
          icon={Eye}
          delay={300}
        />
        <StatCard
          title="Unique Visitors"
          value={realTimeData.uniqueVisitors.toLocaleString()}
          change="+8%"
          changeType="positive"
          description="Real-time unique visitors"
          icon={Users}
          delay={400}
        />
        <StatCard
          title="Revenue"
          value={`$${realTimeData.revenue.toLocaleString()}`}
          change="+15%"
          changeType="positive"
          description="Real-time revenue"
          icon={DollarSign}
          delay={500}
        />
        <StatCard
          title="Bounce Rate"
          value={`${realTimeData.bounceRate.toFixed(1)}%`}
          change="-2%"
          changeType="negative"
          description="Real-time bounce rate"
          icon={Activity}
          delay={600}
        />
      </div>

      {/* Charts and Data */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                    <p className="text-sm">Integration with chart library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                    <p className="text-sm">Integration with chart library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Direct", percentage: 45, visitors: 12847, color: "bg-blue-500" },
                  { name: "Search Engines", percentage: 35, visitors: 9847, color: "bg-green-500" },
                  { name: "Social Media", percentage: 15, visitors: 4247, color: "bg-purple-500" },
                  { name: "Referrals", percentage: 5, visitors: 1247, color: "bg-orange-500" }
                ].map((source, index) => (
                  <div key={source.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${source.color} rounded-full`}></div>
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{source.percentage}%</div>
                        <div className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitors</div>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue by product and service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Premium Subscriptions</span>
                  <div className="text-right">
                    <div className="font-medium">$28,500</div>
                    <div className="text-sm text-muted-foreground">63% of total</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>One-time Purchases</span>
                  <div className="text-right">
                    <div className="font-medium">$12,500</div>
                    <div className="text-sm text-muted-foreground">28% of total</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Consulting Services</span>
                  <div className="text-right">
                    <div className="font-medium">$4,231</div>
                    <div className="text-sm text-muted-foreground">9% of total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium">{page.page}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="text-right">
                        <div className="font-medium text-foreground">{page.views.toLocaleString()}</div>
                        <div>views</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">{page.uniqueVisitors.toLocaleString()}</div>
                        <div>unique</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">{page.bounceRate}</div>
                        <div>bounce rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
