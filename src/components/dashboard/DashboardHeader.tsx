
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Filter } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="backdrop-blur-lg bg-white/30 rounded-2xl border border-white/20 shadow-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PMO Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time employee allocation and project insights
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/70 transition-all duration-200">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/70 transition-all duration-200">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/70 transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
