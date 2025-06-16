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
import { RealTimeIndicator } from './dashboard/RealTimeIndicator';
import { generateMockResourceData } from '@/utils/mockResourceData';
import { ResourceData } from '@/types/resource';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export const RMSDashboard = () => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [filteredData, setFilteredData] = useState<ResourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'resources'>('overview');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    experience: '',
    search: ''
  });
  const { toast } = useToast();

  // Real-time data updates with 24-hour refresh cycle
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const data = generateMockResourceData(250);
        setResourceData(data);
        setFilteredData(data);
        setLastUpdated(new Date());
        setIsLoading(false);
        
        toast({
          title: "Data Refreshed",
          description: "Dashboard updated with latest resource information",
          duration: 2000,
        });
      }, 800);
    };

    loadData();
    
    // Real-time updates every 30 seconds for demo
    const realTimeInterval = setInterval(loadData, 30000);
    
    // Full refresh every 24 hours
    const dailyRefreshInterval = setInterval(() => {
      console.log('Performing 24-hour data refresh...');
      loadData();
      toast({
        title: "Daily Refresh Complete",
        description: "System has been refreshed with the latest data from all sources",
        duration: 5000,
      });
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => {
      clearInterval(realTimeInterval);
      clearInterval(dailyRefreshInterval);
    };
  }, [toast]);

  // Apply filters
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

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'} flex items-center justify-center`}>
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-indigo-400 mx-auto opacity-20"></div>
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'} mb-2`}>
            Loading Resource Management System
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
            Preparing your dynamic dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-[1920px] mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <DashboardHeader 
          isDarkMode={isDarkMode} 
          onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
          onRefresh={() => {
            console.log('Manual refresh triggered');
            window.location.reload();
          }}
        />
        
        <RealTimeIndicator lastUpdated={lastUpdated} isDarkMode={isDarkMode} />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          <div className="xl:col-span-3 space-y-4 sm:space-y-6">
            <KPICards data={filteredData} isDarkMode={isDarkMode} />
            
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className={`grid w-full sm:w-auto grid-cols-3 ${
                  isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'
                } backdrop-blur-lg`}>
                  <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
                  <TabsTrigger value="analytics" className="text-sm font-medium">Analytics</TabsTrigger>
                  <TabsTrigger value="resources" className="text-sm font-medium">Resources</TabsTrigger>
                </TabsList>
                <QuickActions isDarkMode={isDarkMode} />
              </div>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <ResourceAllocationChart data={filteredData} isDarkMode={isDarkMode} />
                  <UtilizationChart data={filteredData} isDarkMode={isDarkMode} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <DepartmentChart data={filteredData} isDarkMode={isDarkMode} />
                  <SkillsChart data={filteredData} isDarkMode={isDarkMode} />
                  <ProjectTimelineChart data={filteredData} isDarkMode={isDarkMode} />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <Card className={`lg:col-span-2 ${
                    isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
                  } backdrop-blur-lg border-white/30`}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Advanced Analytics Dashboard</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                          <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Performance Insights</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                            Track team performance metrics and productivity trends
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}>
                          <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Resource Optimization</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                            AI-powered recommendations for better resource allocation
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                          <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Predictive Analytics</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                            Forecast future resource needs and capacity planning
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4 sm:space-y-6">
                <ResourceTable data={filteredData} isDarkMode={isDarkMode} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="xl:col-span-1">
            <FilterPanel 
              filters={filters} 
              onFiltersChange={setFilters}
              resourceData={resourceData}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
