
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const QuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} functionality would be implemented here.`,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size="sm" 
        onClick={() => handleAction('Add Resource')}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Resource
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleAction('Import')}
        className="bg-white/60 hover:bg-white/80 border-white/30"
      >
        <Upload className="h-4 w-4 mr-2" />
        Import
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleAction('Export')}
        className="bg-white/60 hover:bg-white/80 border-white/30"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleAction('Schedule')}
        className="bg-white/60 hover:bg-white/80 border-white/30"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Schedule
      </Button>
    </div>
  );
};
