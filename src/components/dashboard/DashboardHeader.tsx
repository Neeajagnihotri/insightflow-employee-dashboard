
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Filter, Settings, Users } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Resource Management System
            </h1>
            <p className="text-slate-600 mt-1">
              Real-time resource allocation and utilization insights
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/60 hover:bg-white/80 border-white/30 text-slate-700 transition-all duration-200"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/60 hover:bg-white/80 border-white/30 text-slate-700 transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/60 hover:bg-white/80 border-white/30 text-slate-700 transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/60 hover:bg-white/80 border-white/30 text-slate-700 transition-all duration-200"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
