import React, { createContext, useContext, useEffect, useState } from 'react';

interface Settings {
  // General Settings
  darkMode: boolean;
  autoSave: boolean;
  sidebarCollapsed: boolean;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  
  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: number; // in minutes
  loginAlerts: boolean;
  
  // System Settings
  dataRetention: number; // in days
  cacheSize: number; // in MB
  systemStatus: 'operational' | 'maintenance' | 'degraded';
}

const defaultSettings: Settings = {
  darkMode: false,
  autoSave: true,
  sidebarCollapsed: false,
  emailNotifications: true,
  pushNotifications: true,
  weeklyDigest: false,
  twoFactorAuth: false,
  sessionTimeout: 30,
  loginAlerts: true,
  dataRetention: 90,
  cacheSize: 0,
  systemStatus: 'operational'
};

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
  exportSettings: () => void;
  clearCache: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('datapulse-settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('datapulse-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'datapulse-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearCache = () => {
    // Simulate cache clearing
    updateSetting('cacheSize', 0);
    // In a real app, you would clear actual cache
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSetting, 
      resetSettings, 
      exportSettings, 
      clearCache 
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
