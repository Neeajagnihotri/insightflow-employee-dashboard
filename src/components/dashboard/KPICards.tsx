import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, GraduationCap, TrendingUp, TrendingDown, Clock, BarChart3 } from 'lucide-react';
import { ResourceData } from '@/types/resource';
import { useToast } from '@/hooks/use-toast';
import { AnalyticsModal } from './AnalyticsModal';

interface KPICardsProps {
  data: ResourceData[];
  isDarkMode: boolean;
}

export const KPICards = ({ data, isDarkMode }: KPICardsProps) => {
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

  const kpis = [
    {
      title: 'Total Resources',
      value: totalResources,
      change: 12,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
      description: 'Active employees',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {kpis.map((kpi, index) => (
          <Card 
            key={index} 
            onClick={() => handleKPIClick(kpi.title, kpi.value, kpi.analytics)}
            className={`${
              isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
            } backdrop-blur-lg border-white/30 hover:${
              isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'
            } transition-all duration-300 group hover:scale-105 hover:shadow-lg animate-fade-in cursor-pointer overflow-hidden relative`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div 
              className="absolute inset-0 opacity-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${kpi.image})` }}
            />
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
              <div>
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
