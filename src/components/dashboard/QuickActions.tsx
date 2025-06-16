
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download, Calendar, UserPlus, FileText, BarChart3, Settings2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsProps {
  isDarkMode: boolean;
}

export const QuickActions = ({ isDarkMode }: QuickActionsProps) => {
  const { toast } = useToast();

  const handleAddResource = () => {
    toast({
      title: "Add New Resource",
      description: "Opening resource creation form...",
      duration: 2000,
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Resources",
      description: "CSV/Excel import wizard is opening...",
      duration: 2000,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Data",
      description: "Generating comprehensive resource report...",
      duration: 2000,
    });
  };

  const handleSchedule = () => {
    toast({
      title: "Resource Scheduler",
      description: "Opening project assignment calendar...",
      duration: 2000,
    });
  };

  const handleBulkUpdate = () => {
    toast({
      title: "Bulk Operations",
      description: "Multi-select resource management tools...",
      duration: 2000,
    });
  };

  const handleReports = () => {
    toast({
      title: "Advanced Reports",
      description: "Generating detailed analytics reports...",
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size="sm" 
        onClick={handleAddResource}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Resource
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleImport}
        className={`${
          isDarkMode 
            ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
            : 'bg-white/60 hover:bg-white/80 border-white/30'
        } shadow-lg`}
      >
        <Upload className="h-4 w-4 mr-2" />
        Import
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
        className={`${
          isDarkMode 
            ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
            : 'bg-white/60 hover:bg-white/80 border-white/30'
        } shadow-lg`}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSchedule}
        className={`${
          isDarkMode 
            ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
            : 'bg-white/60 hover:bg-white/80 border-white/30'
        } shadow-lg`}
      >
        <Calendar className="h-4 w-4 mr-2" />
        Schedule
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleBulkUpdate}
        className={`${
          isDarkMode 
            ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
            : 'bg-white/60 hover:bg-white/80 border-white/30'
        } shadow-lg`}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Bulk Edit
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleReports}
        className={`${
          isDarkMode 
            ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
            : 'bg-white/60 hover:bg-white/80 border-white/30'
        } shadow-lg`}
      >
        <BarChart3 className="h-4 w-4 mr-2" />
        Reports
      </Button>
    </div>
  );
};
