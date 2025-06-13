
import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { KPICards } from './dashboard/KPICards';
import { ResourceAllocationChart } from './dashboard/ResourceAllocationChart';
import { UtilizationChart } from './dashboard/UtilizationChart';
import { DepartmentChart } from './dashboard/DepartmentChart';
import { SkillsChart } from './dashboard/SkillsChart';
import { ProjectTimelineChart } from './dashboard/ProjectTimelineChart';
import { generateMockResourceData } from '@/utils/mockResourceData';
import { ResourceData } from '@/types/resource';

export const PMODashboard = () => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setResourceData(generateMockResourceData());
        setIsLoading(false);
      }, 1000);
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading Resource Management System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <DashboardHeader />
        
        <KPICards data={resourceData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResourceAllocationChart data={resourceData} />
          <UtilizationChart data={resourceData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DepartmentChart data={resourceData} />
          <SkillsChart data={resourceData} />
          <ProjectTimelineChart data={resourceData} />
        </div>
      </div>
    </div>
  );
};
