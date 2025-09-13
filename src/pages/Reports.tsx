import { useState } from "react";
import { FileText, Download, Calendar, Filter, Search, Plus, Eye, Edit, Trash2, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Report {
  id: number;
  title: string;
  type: string;
  status: "Completed" | "In Progress" | "Draft";
  createdBy: string;
  createdAt: string;
  lastModified: string;
  size: string;
  format: string;
  description?: string;
  scheduled?: boolean;
  nextRun?: string;
}

const initialReports: Report[] = [
  {
    id: 1,
    title: "DataPulse Monthly Sales Report",
    type: "Sales",
    status: "Completed",
    createdBy: "John Doe",
    createdAt: "2024-01-15",
    lastModified: "2024-01-15",
    size: "2.4 MB",
    format: "PDF",
    description: "Comprehensive monthly sales analysis and revenue insights"
  },
  {
    id: 2,
    title: "DataPulse User Analytics Q4 2023",
    type: "Analytics",
    status: "Completed",
    createdBy: "Jane Smith",
    createdAt: "2024-01-10",
    lastModified: "2024-01-12",
    size: "1.8 MB",
    format: "Excel",
    description: "Quarterly user behavior and engagement analytics"
  },
  {
    id: 3,
    title: "DataPulse Financial Summary",
    type: "Financial",
    status: "In Progress",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-20",
    lastModified: "2024-01-22",
    size: "0.5 MB",
    format: "PDF",
    description: "Financial performance and budget analysis"
  },
  {
    id: 4,
    title: "DataPulse Marketing Campaign Results",
    type: "Marketing",
    status: "Completed",
    createdBy: "Sarah Wilson",
    createdAt: "2024-01-18",
    lastModified: "2024-01-18",
    size: "3.2 MB",
    format: "PowerPoint",
    description: "Marketing campaign performance and ROI analysis",
    scheduled: true,
    nextRun: "2024-02-01"
  },
  {
    id: 5,
    title: "DataPulse Customer Feedback Analysis",
    type: "Customer",
    status: "Draft",
    createdBy: "David Brown",
    createdAt: "2024-01-25",
    lastModified: "2024-01-25",
    size: "0.2 MB",
    format: "Word",
    description: "Customer satisfaction and feedback analysis"
  }
];

const reportTemplates = [
  {
    id: 1,
    name: "Sales Performance",
    description: "Monthly sales metrics and KPIs",
    category: "Sales",
    lastUsed: "2024-01-15"
  },
  {
    id: 2,
    name: "User Engagement",
    description: "User activity and engagement metrics",
    category: "Analytics",
    lastUsed: "2024-01-10"
  },
  {
    id: 3,
    name: "Financial Summary",
    description: "Revenue, expenses, and profit analysis",
    category: "Financial",
    lastUsed: "2024-01-20"
  },
  {
    id: 4,
    name: "Marketing ROI",
    description: "Marketing campaign performance and ROI",
    category: "Marketing",
    lastUsed: "2024-01-18"
  }
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("reports");
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const [isEditReportOpen, setIsEditReportOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [newReport, setNewReport] = useState({
    title: "",
    type: "Sales",
    description: "",
    format: "PDF"
  });
  const { toast } = useToast();

  const handleNewReport = () => {
    setIsNewReportOpen(true);
  };

  const handleCreateReport = () => {
    if (!newReport.title || !newReport.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const report: Report = {
      id: Math.max(...reports.map(r => r.id)) + 1,
      title: newReport.title,
      type: newReport.type,
      status: "Draft",
      createdBy: "Current User",
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      size: "0.1 MB",
      format: newReport.format,
      description: newReport.description
    };

    setReports([...reports, report]);
    setNewReport({ title: "", type: "Sales", description: "", format: "PDF" });
    setIsNewReportOpen(false);
    toast({
      title: "Report Created",
      description: `${report.title} has been created successfully`,
    });
  };

  const handleEditReport = (report: Report) => {
    setEditingReport(report);
    setIsEditReportOpen(true);
  };

  const handleUpdateReport = () => {
    if (!editingReport) return;

    setReports(reports.map(report => 
      report.id === editingReport.id ? editingReport : report
    ));
    setIsEditReportOpen(false);
    setEditingReport(null);
    toast({
      title: "Report Updated",
      description: `${editingReport.title} has been updated successfully`,
    });
  };

  const handleDeleteReport = (reportId: number, reportTitle: string) => {
    setReports(reports.filter(report => report.id !== reportId));
    toast({
      title: "Report Deleted",
      description: `${reportTitle} has been deleted`,
      variant: "destructive"
    });
  };

  const handleViewReport = (report: Report) => {
    toast({
      title: "Opening Report",
      description: `Opening ${report.title} in new tab`,
    });
    // In a real app, this would open the report
  };

  const handleDownloadReport = (report: Report) => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.${report.format.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: `${report.title} is being downloaded`,
    });
  };

  const handleUseTemplate = (templateName: string) => {
    setNewReport({
      title: `DataPulse ${templateName} Report`,
      type: templateName,
      description: `Generated from ${templateName} template`,
      format: "PDF"
    });
    setIsNewReportOpen(true);
    toast({
      title: "Template Applied",
      description: `Using ${templateName} template for new report`,
    });
  };

  const handleCreateSchedule = () => {
    toast({
      title: "Schedule Created",
      description: "Report scheduling feature will be available soon",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by filteredReports
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || report.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || report.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: reports.length,
    completed: reports.filter(r => r.status === "Completed").length,
    inProgress: reports.filter(r => r.status === "In Progress").length,
    scheduled: reports.filter(r => r.scheduled).length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-scale-in">Data Reports</h1>
          <p className="text-muted-foreground animate-fade-in delay-100">Generate comprehensive reports and insights from DataPulse analytics</p>
        </div>
        <Button onClick={handleNewReport} className="gap-2 hover-scale animate-fade-in delay-200">
          <Plus className="h-4 w-4" />
          New Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reports"
          value={stats.total.toString()}
          change="+12"
          changeType="positive"
          description="DataPulse reports"
          icon={FileText}
          delay={300}
        />
        <StatCard
          title="Completed"
          value={stats.completed.toString()}
          change={`${Math.round((stats.completed / stats.total) * 100)}%`}
          changeType="positive"
          description="completion rate"
          icon={CheckCircle}
          delay={400}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress.toString()}
          change=""
          changeType="neutral"
          description="Active reports"
          icon={Clock}
          delay={500}
        />
        <StatCard
          title="Scheduled"
          value={stats.scheduled.toString()}
          change=""
          changeType="neutral"
          description="Automated reports"
          icon={Calendar}
          delay={600}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Manage and view your generated reports</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search reports..." 
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground">{report.format}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            report.status === 'Completed' ? 'default' : 
                            report.status === 'In Progress' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{report.createdBy}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {report.lastModified}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {report.size}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewReport(report)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadReport(report)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditReport(report)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteReport(report.id, report.title)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Last used: {template.lastUsed}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleUseTemplate(template.name)}
                      >
                        Use Template
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Template Preview",
                          description: `Previewing ${template.name} template`,
                        })}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated reports that run on a schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <p>No scheduled reports configured</p>
                <p className="text-sm">Set up automated reports to save time</p>
                <Button onClick={handleCreateSchedule} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Report Dialog */}
      <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Create a new DataPulse report with custom parameters
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                value={newReport.title}
                onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                placeholder="Enter report title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={newReport.type} onValueChange={(value) => setNewReport({...newReport, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-format">Format</Label>
              <Select value={newReport.format} onValueChange={(value) => setNewReport({...newReport, format: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="PowerPoint">PowerPoint</SelectItem>
                  <SelectItem value="Word">Word</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-description">Description</Label>
              <Textarea
                id="report-description"
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                placeholder="Enter report description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport}>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Report Dialog */}
      <Dialog open={isEditReportOpen} onOpenChange={setIsEditReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
            <DialogDescription>
              Update report information and settings
            </DialogDescription>
          </DialogHeader>
          {editingReport && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-report-title">Report Title</Label>
                <Input
                  id="edit-report-title"
                  value={editingReport.title}
                  onChange={(e) => setEditingReport({...editingReport, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-report-type">Report Type</Label>
                <Select value={editingReport.type} onValueChange={(value) => setEditingReport({...editingReport, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-report-status">Status</Label>
                <Select value={editingReport.status} onValueChange={(value: "Completed" | "In Progress" | "Draft") => setEditingReport({...editingReport, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-report-description">Description</Label>
                <Textarea
                  id="edit-report-description"
                  value={editingReport.description || ''}
                  onChange={(e) => setEditingReport({...editingReport, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateReport}>
              Update Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
