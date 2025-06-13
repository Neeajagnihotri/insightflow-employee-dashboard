
import React, { useState, useEffect } from 'react';
import { KPICards } from './dashboard/KPICards';
import { EmployeeAllocationChart } from './dashboard/EmployeeAllocationChart';
import { BenchCategorizationChart } from './dashboard/BenchCategorizationChart';
import { BenchAgingChart } from './dashboard/BenchAgingChart';
import { RoleDistributionChart } from './dashboard/RoleDistributionChart';
import { ExperienceChart } from './dashboard/ExperienceChart';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { generateMockEmployeeData } from '@/utils/mockData';
import { EmployeeData } from '@/types/employee';

export const PMODashboard = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time data loading
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setEmployeeData(generateMockEmployeeData());
        setIsLoading(false);
      }, 1000);
    };

    loadData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading PMO Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        
        <KPICards data={employeeData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmployeeAllocationChart data={employeeData} />
          <BenchCategorizationChart data={employeeData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BenchAgingChart data={employeeData} />
          <RoleDistributionChart data={employeeData} />
          <ExperienceChart data={employeeData} />
        </div>
      </div>
    </div>
  );
};
