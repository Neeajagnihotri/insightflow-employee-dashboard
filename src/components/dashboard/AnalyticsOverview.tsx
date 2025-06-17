
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, Target, Award, Clock, Download, Filter, RefreshCw } from 'lucide-react';
import { ResourceData, ProjectData } from '@/types/resource';

interface AnalyticsOverviewProps {
  resourceData: ResourceData[];
  projectData: ProjectData[];
  isDarkMode: boolean;
}

export const AnalyticsOverview = ({ resourceData, projectData, isDarkMode }: AnalyticsOverviewProps) => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'utilization' | 'performance' | 'salary' | 'skills'>('utilization');

  // Department Analytics
  const departmentAnalytics = resourceData.reduce((acc, resource) => {
    const dept = resource.department;
    if (!acc[dept]) {
      acc[dept] = {
        department: dept,
        totalResources: 0,
        available: 0,
        assigned: 0,
        onLeave: 0,
        training: 0,
        avgUtilization: 0,
        avgSalary: 0,
        avgPerformance: 0,
        totalSalary: 0,
        utilizationSum: 0,
        performanceSum: 0
      };
    }
    acc[dept].totalResources++;
    acc[dept][resource.status.toLowerCase().replace(' ', '')]++;
    acc[dept].totalSalary += resource.salary;
    acc[dept].utilizationSum += resource.utilizationRate;
    acc[dept].performanceSum += resource.performanceRating;
    return acc;
  }, {} as Record<string, any>);

  const departmentData = Object.values(departmentAnalytics).map((dept: any) => ({
    ...dept,
    avgUtilization: Math.round(dept.utilizationSum / dept.totalResources),
    avgSalary: Math.round(dept.totalSalary / dept.totalResources),
    avgPerformance: Number((dept.performanceSum / dept.totalResources).toFixed(1))
  }));

  // Skills Analytics
  const skillsAnalytics = resourceData.reduce((acc, resource) => {
    resource.skills.forEach(skill => {
      if (!acc[skill]) {
        acc[skill] = {
          skill,
          count: 0,
          avgUtilization: 0,
          avgSalary: 0,
          avgPerformance: 0,
          utilizationSum: 0,
          salarySum: 0,
          performanceSum: 0
        };
      }
      acc[skill].count++;
      acc[skill].utilizationSum += resource.utilizationRate;
      acc[skill].salarySum += resource.salary;
      acc[skill].performanceSum += resource.performanceRating;
    });
    return acc;
  }, {} as Record<string, any>);

  const topSkills = Object.values(skillsAnalytics)
    .map((skill: any) => ({
      ...skill,
      avgUtilization: Math.round(skill.utilizationSum / skill.count),
      avgSalary: Math.round(skill.salarySum / skill.count),
      avgPerformance: Number((skill.performanceSum / skill.count).toFixed(1))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Performance vs Salary Analysis
  const performanceSalaryData = resourceData.map(resource => ({
    name: resource.name,
    performance: resource.performanceRating,
    salary: resource.salary / 1000, // Convert to thousands
    utilization: resource.utilizationRate,
    department: resource.department,
    experience: resource.experience
  }));

  // Utilization Trends (mock data for demonstration)
  const utilizationTrends = [
    { month: 'Jan', utilization: 78, target: 85, performance: 3.2 },
    { month: 'Feb', utilization: 82, target: 85, performance: 3.4 },
    { month: 'Mar', utilization: 85, target: 85, performance: 3.6 },
    { month: 'Apr', utilization: 88, target: 85, performance: 3.8 },
    { month: 'May', utilization: 91, target: 85, performance: 4.0 },
    { month: 'Jun', utilization: 87, target: 85, performance: 3.9 }
  ];

  // Experience Level Distribution
  const experienceData = resourceData.reduce((acc, resource) => {
    const level = resource.experience;
    if (!acc[level]) acc[level] = { name: level, value: 0, avgSalary: 0, salarySum: 0 };
    acc[level].value++;
    acc[level].salarySum += resource.salary;
    return acc;
  }, {} as Record<string, any>);

  const experienceDistribution = Object.values(experienceData).map((exp: any) => ({
    ...exp,
    avgSalary: Math.round(exp.salarySum / exp.value)
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

  const handleExportData = () => {
    const analyticsData = {
      timestamp: new Date().toISOString(),
      departments: departmentData,
      skills: topSkills,
      performance: performanceSalaryData,
      trends: utilizationTrends,
      experience: experienceDistribution
    };
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            Analytics Overview
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full grid-cols-5 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Total Resources</span>
                </div>
                <p className="text-2xl font-bold">{resourceData.length}</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Avg Utilization</span>
                </div>
                <p className="text-2xl font-bold">
                  {Math.round(resourceData.reduce((sum, r) => sum + r.utilizationRate, 0) / resourceData.length)}%
                </p>
                <p className="text-xs text-green-600">+5% from last month</p>
              </CardContent>
            </Card>
            
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium">Avg Salary</span>
                </div>
                <p className="text-2xl font-bold">
                  ${Math.round(resourceData.reduce((sum, r) => sum + r.salary, 0) / resourceData.length / 1000)}K
                </p>
                <p className="text-xs text-blue-600">Market aligned</p>
              </CardContent>
            </Card>
            
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium">Avg Performance</span>
                </div>
                <p className="text-2xl font-bold">
                  {(resourceData.reduce((sum, r) => sum + r.performanceRating, 0) / resourceData.length).toFixed(1)}
                </p>
                <p className="text-xs text-green-600">Excellent rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Department Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="totalResources"
                      label={({department, totalResources}) => `${department}: ${totalResources}`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Utilization Trends */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Utilization Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={utilizationTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                    <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '12px',
                        border: 'none'
                      }}
                    />
                    <Area type="monotone" dataKey="utilization" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Performance */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle>Department Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                    <XAxis dataKey="department" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgUtilization" fill="#3b82f6" name="Avg Utilization %" />
                    <Bar dataKey="avgPerformance" fill="#10b981" name="Avg Performance" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Resource Allocation */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle>Resource Status by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                    <XAxis dataKey="department" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="available" stackId="a" fill="#10b981" name="Available" />
                    <Bar dataKey="assigned" stackId="a" fill="#3b82f6" name="Assigned" />
                    <Bar dataKey="onleave" stackId="a" fill="#f59e0b" name="On Leave" />
                    <Bar dataKey="training" stackId="a" fill="#8b5cf6" name="Training" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Skills */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle>Most In-Demand Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={topSkills} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                    <XAxis type="number" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                    <YAxis type="category" dataKey="skill" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={10} width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Performance Radar */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle>Skills Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={topSkills.slice(0, 6)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Utilization" dataKey="avgUtilization" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Performance" dataKey="avgPerformance" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance vs Salary Scatter */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle>Performance vs Salary Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={performanceSalaryData.slice(0, 15)}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                    <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={10} angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#3b82f6" name="Performance Rating" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Experience Level Distribution */}
            <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
              <CardHeader>
                <CardTitle>Experience Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={experienceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}`}
                    >
                      {experienceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg`}>
            <CardHeader>
              <CardTitle>Historical Trends & Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={utilizationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} />
                  <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="utilization" stroke="#3b82f6" strokeWidth={3} name="Utilization %" />
                  <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} name="Performance Rating" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
