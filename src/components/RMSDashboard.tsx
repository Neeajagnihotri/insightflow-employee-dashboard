
import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { KPICards } from './dashboard/KPICards';
import { ResourceAllocationChart } from './dashboard/ResourceAllocationChart';
import { UtilizationChart } from './dashboard/UtilizationChart';
import { DepartmentChart } from './dashboard/DepartmentChart';
import { SkillsChart } from './dashboard/SkillsChart';
import { ProjectTimelineChart } from './dashboard/ProjectTimelineChart';
import { ResourceTable } from './dashboard/ResourceTable';
import { FilterPanel } from './dashboard/FilterPanel';
import { QuickActions } from './dashboard/QuickActions';
import { generateMockResourceData } from '@/utils/mockResourceData';
import { ResourceData } from '@/types/resource';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const RMSDashboard = () => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [filteredData, setFilteredData] = useState<ResourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'resources'>('overview');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    experience: '',
    search: ''
  });

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const data = generateMockResourceData(200);
        setResourceData(data);
        setFilteredData(data);
        setIsLoading(false);
      }, 1000);
    };

    loadData();
    const interval = setInterval(loadData, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = resourceData;
    
    if (filters.department) {
      filtered = filtered.filter(r => r.department === filters.department);
    }
    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }
    if (filters.experience) {
      filtered = filtered.filter(r => r.experience === filters.experience);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchLower) ||
        r.role.toLowerCase().includes(searchLower) ||
        r.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredData(filtered);
  }, [filters, resourceData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-indigo-400 mx-auto opacity-20"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading Resource Management System</h2>
          <p className="text-slate-600">Preparing your dynamic dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-[1920px] mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          <div className="xl:col-span-3 space-y-4 sm:space-y-6">
            <KPICards data={filteredData} />
            
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-white/60 backdrop-blur-lg">
                  <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
                  <TabsTrigger value="analytics" className="text-sm font-medium">Analytics</TabsTrigger>
                  <TabsTrigger value="resources" className="text-sm font-medium">Resources</TabsTrigger>
                </TabsList>
                <QuickActions />
              </div>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <ResourceAllocationChart data={filteredData} />
                  <UtilizationChart data={filteredData} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <DepartmentChart data={filteredData} />
                  <SkillsChart data={filteredData} />
                  <ProjectTimelineChart data={filteredData} />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="lg:col-span-2 bg-white/70 backdrop-blur-lg border-white/30">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Advanced Analytics Coming Soon</h3>
                      <p className="text-slate-600">Detailed performance metrics, predictive analytics, and resource optimization insights.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4 sm:space-y-6">
                <ResourceTable data={filteredData} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="xl:col-span-1">
            <FilterPanel 
              filters={filters} 
              onFiltersChange={setFilters}
              resourceData={resourceData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
