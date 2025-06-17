
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { EnhancedKPICards } from './dashboard/EnhancedKPICards';
import { AnalyticsOverview } from './dashboard/AnalyticsOverview';
import { AddResourceForm } from './forms/AddResourceForm';
import { AddProjectForm } from './forms/AddProjectForm';
import { ProjectAllocationForm } from './forms/ProjectAllocationForm';
import { ResourceTable } from './dashboard/ResourceTable';
import { FilterPanel } from './dashboard/FilterPanel';
import { RealTimeIndicator } from './dashboard/RealTimeIndicator';
import { generateMockResourceData } from '@/utils/mockResourceData';
import { ResourceData, ProjectData } from '@/types/resource';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export const EnhancedRMSDashboard = () => {
  const { user, logout, loading } = useAuth();
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [filteredData, setFilteredData] = useState<ResourceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([
    { 
      id: 'project-1', 
      name: 'E-commerce Platform',
      clientName: 'TechCorp Inc',
      engineeringManager: 'Sarah Johnson',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 250000,
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      assignedResources: []
    },
    { 
      id: 'project-2', 
      name: 'Mobile Banking App',
      clientName: 'FinanceFirst Bank',
      engineeringManager: 'Mike Chen',
      status: 'Active',
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      budget: 180000,
      requiredSkills: ['React Native', 'Python', 'PostgreSQL', 'Docker', 'Security'],
      assignedResources: []
    },
    { 
      id: 'project-3', 
      name: 'Healthcare Dashboard',
      clientName: 'MedTech Solutions',
      engineeringManager: 'Lisa Wang',
      status: 'Planning',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      budget: 320000,
      requiredSkills: ['Vue.js', 'Java', 'MySQL', 'HIPAA Compliance', 'API Development'],
      assignedResources: []
    },
    { 
      id: 'project-4', 
      name: 'AI Analytics Tool',
      clientName: 'DataDriven Corp',
      engineeringManager: 'Alex Kumar',
      status: 'Active',
      startDate: '2024-01-20',
      endDate: '2024-07-20',
      budget: 400000,
      requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'Big Data', 'Docker'],
      assignedResources: []
    }
  ]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'resources'>('overview');
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
    const newProject: ProjectData = {
      id: `project-${Date.now()}`,
      name: project.name,
      clientName: project.clientName,
      engineeringManager: project.engineeringManager,
      status: 'Planning',
      startDate: project.startDate || new Date().toISOString().split('T')[0],
      endDate: project.endDate,
      budget: project.budget || 0,
      requiredSkills: project.requiredSkills || [],
      assignedResources: []
    };
    
    setProjects(prev => [...prev, newProject]);
    setLastUpdated(new Date());
  };

  const handleProjectAllocation = (allocation: { resourceId: string; projectId: string; resourceName: string; projectName: string }) => {
    setResourceData(prev => prev.map(resource => 
      resource.id === allocation.resourceId 
        ? { ...resource, status: 'Assigned' as ResourceData['status'], currentProject: allocation.projectName }
        : resource
    ));
    
    setProjects(prev => prev.map(project =>
      project.id === allocation.projectId
        ? { ...project, assignedResources: [...project.assignedResources, allocation.resourceId] }
        : project
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
              <TabsList className={`grid w-full sm:w-auto grid-cols-3 ${
                isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'
              } backdrop-blur-lg`}>
                <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
                <TabsTrigger value="analytics" className="text-sm font-medium">Analytics</TabsTrigger>
                <TabsTrigger value="resources" className="text-sm font-medium">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Quick Stats Cards */}
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg border-white/30`}>
                    <h3 className="text-lg font-semibold mb-4">Resource Utilization</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Performers</span>
                        <span className="font-semibold">{filteredData.filter(r => r.performanceRating >= 4.0).length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Underutilized</span>
                        <span className="font-semibold">{filteredData.filter(r => r.utilizationRate < 50).length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Optimal Load</span>
                        <span className="font-semibold">{filteredData.filter(r => r.utilizationRate >= 70 && r.utilizationRate <= 90).length}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg border-white/30`}>
                    <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Payroll</span>
                        <span className="font-semibold">${(filteredData.reduce((sum, r) => sum + r.salary, 0) / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg Salary</span>
                        <span className="font-semibold">${Math.round(filteredData.reduce((sum, r) => sum + r.salary, 0) / filteredData.length / 1000)}K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Project Budget</span>
                        <span className="font-semibold">${(projects.reduce((sum, p) => sum + (p.budget || 0), 0) / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg border-white/30`}>
                    <h3 className="text-lg font-semibold mb-4">Skill Insights</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Most Demanded</span>
                        <span className="font-semibold">React</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Skill Gap</span>
                        <span className="font-semibold text-amber-600">DevOps</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Training Active</span>
                        <span className="font-semibold">{filteredData.filter(r => r.status === 'Training').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                <AnalyticsOverview 
                  resourceData={filteredData}
                  projectData={projects}
                  isDarkMode={isDarkMode}
                />
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
