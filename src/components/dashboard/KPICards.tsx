
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, GraduationCap, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { ResourceData } from '@/types/resource';

interface KPICardsProps {
  data: ResourceData[];
}

export const KPICards = ({ data }: KPICardsProps) => {
  const totalResources = data.length;
  const availableResources = data.filter(r => r.status === 'Available').length;
  const assignedResources = data.filter(r => r.status === 'Assigned').length;
  const onLeaveResources = data.filter(r => r.status === 'On Leave').length;
  const inTrainingResources = data.filter(r => r.status === 'Training').length;
  const averageUtilization = Math.round(data.reduce((sum, r) => sum + r.utilizationRate, 0) / (data.length || 1));
  const averagePerformance = data.length > 0 ? (data.reduce((sum, r) => sum + r.performanceRating, 0) / data.length).toFixed(1) : '0';

  const kpis = [
    {
      title: 'Total Resources',
      value: totalResources,
      change: 12,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active employees'
    },
    {
      title: 'Available',
      value: availableResources,
      change: -5,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      description: 'Ready for assignment'
    },
    {
      title: 'Assigned',
      value: assignedResources,
      change: 8,
      icon: UserX,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Currently working'
    },
    {
      title: 'In Training',
      value: inTrainingResources,
      change: 15,
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Skill development'
    },
    {
      title: 'Avg Utilization',
      value: `${averageUtilization}%`,
      change: 2.5,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Resource efficiency'
    },
    {
      title: 'Performance',
      value: averagePerformance,
      change: 3.2,
      icon: Clock,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      description: 'Average rating'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      {kpis.map((kpi, index) => (
        <Card 
          key={index} 
          className="bg-white/70 backdrop-blur-lg border-white/30 hover:bg-white/80 transition-all duration-300 group hover:scale-105 hover:shadow-lg animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4 sm:p-6">
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
              <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{kpi.value}</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">{kpi.title}</p>
              <p className="text-xs text-slate-500 mt-1">{kpi.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
