
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, UserX, GraduationCap, TrendingUp, TrendingDown, Clock, BarChart3, FileSpreadsheet, Download } from 'lucide-react';
import { ResourceData } from '@/types/resource';
import { useToast } from '@/hooks/use-toast';
import { AnalyticsModal } from './AnalyticsModal';

interface KPICardsProps {
  data: ResourceData[];
  isDarkMode: boolean;
  onDataImport?: () => void;
}

export const KPICards = ({ data, isDarkMode, onDataImport }: KPICardsProps) => {
  const { toast } = useToast();
  const [selectedAnalytics, setSelectedAnalytics] = useState<{title: string, data: any} | null>(null);
  
  const totalResources = data.length;
  const availableResources = data.filter(r => r.status === 'Available').length;
  const assignedResources = data.filter(r => r.status === 'Assigned').length;
  const onLeaveResources = data.filter(r => r.status === 'On Leave').length;
  const inTrainingResources = data.filter(r => r.status === 'Training').length;
  const averageUtilization = Math.round(data.reduce((sum, r) => sum + r.utilizationRate, 0) / (data.length || 1));
  const averagePerformance = data.length > 0 ? (data.reduce((sum, r) => sum + r.performanceRating, 0) / data.length).toFixed(1) : '0';

  const handleKPIClick = (title: string, value: any, analyticsData: any) => {
    console.log(`Analytics for ${title}:`, analyticsData);
    
    setSelectedAnalytics({ title, data: analyticsData });
    
    toast({
      title: `${title} Analytics`,
      description: `Opening detailed analytics report for ${title}`,
      duration: 2000,
    });
  };

  const handleDataImport = () => {
    toast({
      title: "Data Import",
      description: "Excel data import functionality triggered",
      duration: 2000,
    });
    onDataImport?.();
  };

  const handleExportData = (kpiTitle: string) => {
    const exportData = {
      title: kpiTitle,
      timestamp: new Date().toISOString(),
      data: data.filter(r => {
        switch (kpiTitle) {
          case 'Available': return r.status === 'Available';
          case 'Assigned': return r.status === 'Assigned';
          case 'In Training': return r.status === 'Training';
          default: return true;
        }
      })
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${kpiTitle}_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: `${kpiTitle} data has been exported successfully`,
      duration: 2000,
    });
  };

  const kpis = [
    {
      title: 'Total Resources',
      value: totalResources,
      change: 12,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
      description: 'Active employees',
      analytics: {
        departments: data.reduce((acc, r) => {
          acc[r.department] = (acc[r.department] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        growthRate: '+12%',
        trend: 'increasing'
      }
    },
    {
      title: 'Available',
      value: availableResources,
      change: -5,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      bgColor: isDarkMode ? 'bg-green-900/30' : 'bg-green-50',
      description: 'Ready for assignment',
      analytics: {
        byDepartment: data.filter(r => r.status === 'Available').reduce((acc, r) => {
          acc[r.department] = (acc[r.department] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        availabilityRate: `${((availableResources / totalResources) * 100).toFixed(1)}%`,
        trend: 'decreasing'
      }
    },
    {
      title: 'Assigned',
      value: assignedResources,
      change: 8,
      icon: UserX,
      color: 'from-amber-500 to-amber-600',
      bgColor: isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50',
      description: 'Currently working',
      analytics: {
        projects: data.filter(r => r.status === 'Assigned').length,
        utilizationRate: `${averageUtilization}%`,
        productivity: 'High',
        trend: 'increasing'
      }
    },
    {
      title: 'In Training',
      value: inTrainingResources,
      change: 15,
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50',
      description: 'Skill development',
      analytics: {
        completionRate: '87%',
        skillsImproved: ['React', 'TypeScript', 'Node.js'],
        averageDuration: '6 weeks',
        trend: 'increasing'
      }
    },
    {
      title: 'Avg Utilization',
      value: `${averageUtilization}%`,
      change: 2.5,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50',
      description: 'Resource efficiency',
      analytics: {
        efficiency: 'Optimal',
        benchmark: '85%',
        topPerformers: data.filter(r => r.utilizationRate > 90).slice(0, 3).map(r => r.name),
        trend: 'stable'
      }
    },
    {
      title: 'Performance',
      value: averagePerformance,
      change: 3.2,
      icon: BarChart3,
      color: 'from-rose-500 to-rose-600',
      bgColor: isDarkMode ? 'bg-rose-900/30' : 'bg-rose-50',
      description: 'Average rating',
      analytics: {
        rating: averagePerformance,
        topPerformers: data.filter(r => r.performanceRating >= 4.5).length,
        improvementAreas: ['Communication', 'Time Management'],
        trend: 'improving'
      }
    }
  ];

  return (
    <>
      {/* Data Import Section */}
      <div className="mb-6">
        <Card className={`${
          isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
        } backdrop-blur-lg border-white/30`}>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Data Management</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                  Import data from Excel sheets or export current data
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleDataImport} variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Import Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {kpis.map((kpi, index) => (
          <Card 
            key={index} 
            className={`${
              isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
            } backdrop-blur-lg border-white/30 hover:${
              isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'
            } transition-all duration-300 group hover:scale-105 hover:shadow-lg animate-fade-in overflow-hidden relative`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 sm:p-6 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 sm:p-3 rounded-xl ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <kpi.icon className={`h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`} />
                </div>
                <div className="flex items-center gap-1">
                  {kpi.change > 0 ? (
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className={`text-xl sm:text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                } mb-1`}>{kpi.value}</p>
                <p className={`text-xs sm:text-sm ${
                  isDarkMode ? 'text-gray-200' : 'text-slate-600'
                } font-medium`}>{kpi.title}</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-500'
                } mt-1`}>{kpi.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <Button 
                  onClick={() => handleKPIClick(kpi.title, kpi.value, kpi.analytics)}
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Button>
                <Button 
                  onClick={() => handleExportData(kpi.title)}
                  size="sm"
                  variant="outline"
                  className="px-2"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <AnalyticsModal
        isOpen={!!selectedAnalytics}
        onClose={() => setSelectedAnalytics(null)}
        title={selectedAnalytics?.title || ''}
        analyticsData={selectedAnalytics?.data}
        isDarkMode={isDarkMode}
      />
    </>
  );
};
