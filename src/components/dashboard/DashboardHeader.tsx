
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Filter, Settings, Users, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardHeaderProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  onRefresh: () => void;
}

export const DashboardHeader = ({ isDarkMode, onDarkModeToggle, onRefresh }: DashboardHeaderProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Generating CSV export of resource data...",
      duration: 3000,
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Resource data has been exported successfully.",
        duration: 3000,
      });
    }, 2000);
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Opening dashboard configuration...",
      duration: 2000,
    });
  };

  const handleFilters = () => {
    toast({
      title: "Advanced Filters",
      description: "Enhanced filtering options available in the side panel.",
      duration: 2000,
    });
  };

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
    } backdrop-blur-xl rounded-2xl border ${
      isDarkMode ? 'border-gray-700/30' : 'border-white/30'
    } shadow-2xl p-6 transition-all duration-300`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Resource Management System
            </h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-slate-600'} mt-1`}>
              Real-time resource allocation and utilization insights
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDarkModeToggle}
            className={`${
              isDarkMode 
                ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                : 'bg-white/60 hover:bg-white/80 border-white/30 text-slate-700'
            } transition-all duration-200`}
          >
            {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {isDarkMode ? 'Light' : 'Dark'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleFilters}
            className={`${
              isDarkMode 
                ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                : 'bg-white/60 hover:bg-white/80 border-white/30 text-slate-700'
            } transition-all duration-200`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            className={`${
              isDarkMode 
                ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                : 'bg-white/60 hover:bg-white/80 border-white/30 text-slate-700'
            } transition-all duration-200`}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className={`${
              isDarkMode 
                ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                : 'bg-white/60 hover:bg-white/80 border-white/30 text-slate-700'
            } transition-all duration-200`}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSettings}
            className={`${
              isDarkMode 
                ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                : 'bg-white/60 hover:bg-white/80 border-white/30 text-slate-700'
            } transition-all duration-200`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
