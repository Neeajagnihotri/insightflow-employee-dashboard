
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { EnhancedKPICards } from './dashboard/EnhancedKPICards';
import { AddResourceForm } from './forms/AddResourceForm';
import { AddProjectForm } from './forms/AddProjectForm';
import { ProjectAllocationForm } from './forms/ProjectAllocationForm';
import { ResourceTable } from './dashboard/ResourceTable';
import { FilterPanel } from './dashboard/FilterPanel';
import { RealTimeIndicator } from './dashboard/RealTimeIndicator';
import { generateMockResourceData } from '@/utils/mockResourceData';
import { ResourceData } from '@/types/resource';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export const EnhancedRMSDashboard = () => {
  const { user, logout, loading } = useAuth();
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [filteredData, setFilteredData] = useState<ResourceData[]>([]);
  const [projects, setProjects] = useState([
    { id: 'project-1', name: 'E-commerce Platform' },
    { id: 'project-2', name: 'Mobile Banking App' },
    { id: 'project-3', name: 'Healthcare Dashboard' },
    { id: 'project-4', name: 'AI Analytics Tool' }
  ]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<'overview' | 'resources'>('overview');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    experience: '',
    search: ''
  });
  
  // Form states
  const [showAddResource, setShowAddResource] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showProjectAllocation, setShowProjectAllocation] = useState(false);
  
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    if (user) {
      const loadData = () => {
        setIsLoadingData(true);
        setTimeout(() => {
          const data = generateMockResourceData(100);
          setResourceData(data);
          setFilteredData(data);
          setLastUpdated(new Date());
          setIsLoadingData(false);
        }, 1000);
      };

      loadData();
      
      // Weekly refresh
      const weeklyRefreshInterval = setInterval(() => {
        loadData();
        toast({
          title: "Weekly Refresh Complete",
          description: "Dashboard data has been refreshed automatically",
        });
      }, 7 * 24 * 60 * 60 * 1000);

      return () => clearInterval(weeklyRefreshInterval);
    }
  }, [user, toast]);

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

  const handleAddResource = (resource: Partial<ResourceData>) => {
    const newResource: ResourceData = {
      id: `resource-${Date.now()}`,
      name: resource.name || '',
      email: resource.email || '',
      role: resource.role as ResourceData['role'] || 'Frontend Developer',
      department: resource.department || '',
      status: resource.status as ResourceData['status'] || 'Available',
      experience: resource.experience as ResourceData['experience'] || 'Mid-Level',
      skills: resource.skills || [],
      utilizationRate: resource.utilizationRate || 0,
      performanceRating: resource.performanceRating || 3.0,
      hireDate: resource.hireDate || new Date().toISOString().split('T')[0],
      location: resource.location || '',
      salary: resource.salary || 0,
      currentProject: resource.currentProject,
      projectEndDate: resource.projectEndDate
    };

    setResourceData(prev => [...prev, newResource]);
    setLastUpdated(new Date());
  };

  const handleAddProject = (project: any) => {
    setProjects(prev => [...prev, project]);
    setLastUpdated(new Date());
  };

  const handleProjectAllocation = (allocation: { resourceId: string; projectId: string; resourceName: string; projectName: string }) => {
    setResourceData(prev => prev.map(resource => 
      resource.id === allocation.resourceId 
        ? { ...resource, status: 'Assigned' as ResourceData['status'], currentProject: allocation.projectName }
        : resource
    ));
    setLastUpdated(new Date());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (isLoadingData) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'} flex items-center justify-center`}>
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-indigo-400 mx-auto opacity-20"></div>
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'} mb-2`}>
            Loading Dashboard Data
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
            Fetching latest resource information...
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
        <div className="flex justify-between items-center">
          <DashboardHeader 
            isDarkMode={isDarkMode} 
            onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
            onRefresh={() => window.location.reload()}
          />
          <div className="flex items-center gap-4">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Welcome, {user.name} ({user.role})
            </span>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        <RealTimeIndicator lastUpdated={lastUpdated} isDarkMode={isDarkMode} />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          <div className="xl:col-span-3 space-y-4 sm:space-y-6">
            <EnhancedKPICards 
              data={filteredData}
              projects={projects}
              isDarkMode={isDarkMode}
              onAddResource={() => setShowAddResource(true)}
              onAddProject={() => setShowAddProject(true)}
              onProjectAllocation={() => setShowProjectAllocation(true)}
            />
            
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full">
              <TabsList className={`grid w-full sm:w-auto grid-cols-2 ${
                isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'
              } backdrop-blur-lg`}>
                <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
                <TabsTrigger value="resources" className="text-sm font-medium">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="text-center p-8">
                  <h3 className="text-xl font-semibold mb-2">Dashboard Overview</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Overview charts and analytics will be displayed here
                  </p>
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

      {/* Forms */}
      <AddResourceForm
        isOpen={showAddResource}
        onClose={() => setShowAddResource(false)}
        onSubmit={handleAddResource}
        isDarkMode={isDarkMode}
      />

      <AddProjectForm
        isOpen={showAddProject}
        onClose={() => setShowAddProject(false)}
        onSubmit={handleAddProject}
        isDarkMode={isDarkMode}
      />

      <ProjectAllocationForm
        isOpen={showProjectAllocation}
        onClose={() => setShowProjectAllocation(false)}
        onSubmit={handleProjectAllocation}
        resources={resourceData}
        projects={projects}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
