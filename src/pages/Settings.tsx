import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { useSettings } from "@/contexts/SettingsContext";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Users, 
  Database,
  Mail,
  Globe,
  Download,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Save
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const { theme, setTheme, actualTheme } = useTheme();
  const { settings, updateSetting, resetSettings, exportSettings, clearCache } = useSettings();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    updateSetting('darkMode', newTheme === 'dark');
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${newTheme === 'system' ? 'system preference' : newTheme} mode`,
    });
  };

  const handleSettingChange = (key: keyof typeof settings, value: any, settingName: string) => {
    updateSetting(key, value);
    toast({
      title: "Setting Updated",
      description: `${settingName} has been updated successfully`,
    });
  };

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      exportSettings();
      setIsLoading(false);
      toast({
        title: "Settings Exported",
        description: "Your settings have been exported successfully",
      });
    }, 1000);
  };

  const handleClearCache = () => {
    setIsLoading(true);
    setTimeout(() => {
      clearCache();
      setIsLoading(false);
      toast({
        title: "Cache Cleared",
        description: "Application cache has been cleared successfully",
      });
    }, 1500);
  };

  const handleResetSettings = () => {
    resetSettings();
    setIsResetDialogOpen(false);
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values",
      variant: "destructive"
    });
  };

  const handleEnable2FA = () => {
    setIsLoading(true);
    setTimeout(() => {
      updateSetting('twoFactorAuth', true);
      setIs2FADialogOpen(false);
      setIsLoading(false);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled successfully",
      });
    }, 2000);
  };

  const handleSessionTimeoutChange = (value: string) => {
    const timeout = parseInt(value);
    updateSetting('sessionTimeout', timeout);
    setIsSessionDialogOpen(false);
    toast({
      title: "Session Timeout Updated",
      description: `Session timeout set to ${timeout} minutes`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-scale-in">DataPulse Settings</h1>
          <p className="text-muted-foreground animate-fade-in delay-100">
            Manage your DataPulse application preferences and configurations
          </p>
        </div>
        <div className="flex items-center gap-2 animate-fade-in delay-200">
          <Button 
            variant="outline" 
            onClick={() => setIsResetDialogOpen(true)}
            className="hover-scale"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
          <Button 
            onClick={handleExport} 
            disabled={isLoading}
            className="hover-scale"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card className="glass border-card-border animate-fade-in-up delay-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General
            </CardTitle>
            <CardDescription>
              Basic DataPulse application settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color theme
                </p>
              </div>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save changes as you work
                </p>
              </div>
              <Switch 
                checked={settings.autoSave} 
                onCheckedChange={(checked) => handleSettingChange('autoSave', checked, 'Auto-save')} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sidebar collapsed by default</Label>
                <p className="text-sm text-muted-foreground">
                  Start with sidebar in collapsed state
                </p>
              </div>
              <Switch 
                checked={settings.sidebarCollapsed} 
                onCheckedChange={(checked) => handleSettingChange('sidebarCollapsed', checked, 'Sidebar state')} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass border-card-border animate-fade-in-up delay-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive DataPulse notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked, 'Email notifications')} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch 
                checked={settings.pushNotifications} 
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked, 'Push notifications')} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly digest</Label>
                <p className="text-sm text-muted-foreground">
                  Get a weekly summary of DataPulse activity
                </p>
              </div>
              <Switch 
                checked={settings.weeklyDigest} 
                onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked, 'Weekly digest')} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass border-card-border animate-fade-in-up delay-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              DataPulse security and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-factor authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your DataPulse account
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={settings.twoFactorAuth ? "default" : "outline"} className={settings.twoFactorAuth ? "text-green-600" : "text-warning"}>
                  {settings.twoFactorAuth ? "Enabled" : "Not enabled"}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => settings.twoFactorAuth ? handleSettingChange('twoFactorAuth', false, '2FA') : setIs2FADialogOpen(true)}
                  disabled={isLoading}
                >
                  {settings.twoFactorAuth ? "Disable" : "Enable"}
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session timeout</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after {settings.sessionTimeout} minutes of inactivity
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSessionDialogOpen(true)}
              >
                Configure
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified of new login attempts to your DataPulse account
                </p>
              </div>
              <Switch 
                checked={settings.loginAlerts} 
                onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked, 'Login alerts')} 
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="glass border-card-border animate-fade-in-up delay-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System
            </CardTitle>
            <CardDescription>
              Advanced DataPulse system settings and maintenance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Settings export</Label>
                <p className="text-sm text-muted-foreground">
                  Export all your DataPulse settings in JSON format
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                {isLoading ? "Exporting..." : "Export"}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Clear cache</Label>
                <p className="text-sm text-muted-foreground">
                  Clear DataPulse application cache and temporary files
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearCache}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isLoading ? "Clearing..." : "Clear"}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data retention</Label>
                <p className="text-sm text-muted-foreground">
                  Keep data for {settings.dataRetention} days
                </p>
              </div>
              <Select 
                value={settings.dataRetention.toString()} 
                onValueChange={(value) => handleSettingChange('dataRetention', parseInt(value), 'Data retention')}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System status</Label>
                <p className="text-sm text-muted-foreground">
                  Current DataPulse system health and performance
                </p>
              </div>
              <Badge className={`${
                settings.systemStatus === 'operational' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : settings.systemStatus === 'maintenance'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}>
                {settings.systemStatus === 'operational' ? 'All systems operational' : 
                 settings.systemStatus === 'maintenance' ? 'Under maintenance' : 
                 'System degraded'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="glass border-card-border animate-fade-in-up delay-700">
          <CardHeader>
            <CardTitle>About DataPulse</CardTitle>
            <CardDescription>
              DataPulse application information and version details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Version</p>
                <p className="text-muted-foreground">v1.0.0</p>
              </div>
              <div>
                <p className="font-medium">Last updated</p>
                <p className="text-muted-foreground">2024-01-25</p>
              </div>
              <div>
                <p className="font-medium">License</p>
                <p className="text-muted-foreground">MIT License</p>
              </div>
              <div>
                <p className="font-medium">Support</p>
                <p className="text-muted-foreground">support@datapulse.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Settings Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset All Settings</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset all settings to their default values? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleResetSettings}>
              Reset Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2FA Enable Dialog */}
      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              This will enable 2FA for your DataPulse account. You'll need to set up an authenticator app.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnable2FA} disabled={isLoading}>
              {isLoading ? "Enabling..." : "Enable 2FA"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Session Timeout Dialog */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Session Timeout</DialogTitle>
            <DialogDescription>
              Set how long the session should remain active before automatically logging out.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="timeout">Session Timeout (minutes)</Label>
            <Select value={settings.sessionTimeout.toString()} onValueChange={handleSessionTimeoutChange}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="480">8 hours</SelectItem>
                <SelectItem value="1440">24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSessionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsSessionDialogOpen(false)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}