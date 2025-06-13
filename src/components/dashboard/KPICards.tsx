
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react';
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
  const averageUtilization = Math.round(data.reduce((sum, r) => sum + r.utilizationRate, 0) / data.length);

  const kpis = [
    {
      title: 'Total Resources',
      value: totalResources,
      change: 12,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Available',
      value: availableResources,
      change: -5,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Assigned',
      value: assignedResources,
      change: 8,
      icon: UserX,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'In Training',
      value: inTrainingResources,
      change: 3,
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Utilization',
      value: `${averageUtilization}%`,
      change: 2.5,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="bg-white/70 backdrop-blur-lg border-white/30 hover:bg-white/80 transition-all duration-300 group hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <kpi.icon className={`h-6 w-6 bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`} />
              </div>
              <div className="flex items-center gap-1">
                {kpi.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(kpi.change)}%
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
              <p className="text-sm text-slate-600 mt-1">{kpi.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
