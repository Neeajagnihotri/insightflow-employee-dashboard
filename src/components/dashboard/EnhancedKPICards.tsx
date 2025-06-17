
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, UserMinus, Eye, GraduationCap, FolderOpen, Plus, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { ResourceData } from '@/types/resource';
import { useAuth } from '@/contexts/AuthContext';

interface EnhancedKPICardsProps {
  data: ResourceData[];
  projects: Array<{ id: string; name: string }>;
  isDarkMode: boolean;
  onAddResource: () => void;
  onAddProject: () => void;
  onProjectAllocation: () => void;
}

export const EnhancedKPICards = ({ 
  data, 
  projects, 
  isDarkMode, 
  onAddResource, 
  onAddProject, 
  onProjectAllocation 
}: EnhancedKPICardsProps) => {
  const { user } = useAuth();
  const isResourceManager = user?.role === 'Resource Manager';

  const totalResources = data.length;
  const billableResources = data.filter(r => r.status === 'Assigned').length;
  const benchedResources = data.filter(r => r.status === 'Available').length;
  const shadowResources = data.filter(r => r.status === 'Training').length;
  const associates = data.filter(r => r.experience === 'Junior').length;
  const totalProjects = projects.length;

  const kpis = [
    {
      title: 'Total Resources',
      value: totalResources,
      change: 12,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
      action: isResourceManager ? onAddResource : undefined,
      actionLabel: 'Add Resource'
    },
    {
      title: 'Billable',
      value: billableResources,
      change: 8,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      bgColor: isDarkMode ? 'bg-green-900/30' : 'bg-green-50',
      action: isResourceManager ? onProjectAllocation : undefined,
      actionLabel: 'Allocate'
    },
    {
      title: 'Benched',
      value: benchedResources,
      change: -5,
      icon: UserMinus,
      color: 'from-amber-500 to-amber-600',
      bgColor: isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50',
      action: isResourceManager ? onProjectAllocation : undefined,
      actionLabel: 'Assign'
    },
    {
      title: 'Shadow',
      value: shadowResources,
      change: 3,
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      bgColor: isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
    },
    {
      title: 'Associates',
      value: associates,
      change: 15,
      icon: GraduationCap,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'
    },
    {
      title: 'Total Projects',
      value: totalProjects,
      change: 7,
      icon: FolderOpen,
      color: 'from-rose-500 to-rose-600',
      bgColor: isDarkMode ? 'bg-rose-900/30' : 'bg-rose-50',
      action: isResourceManager ? onAddProject : undefined,
      actionLabel: 'Add Project'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, index) => (
        <Card 
          key={index} 
          className={`${
            isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
          } backdrop-blur-lg border-white/30 hover:${
            isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'
          } transition-all duration-300 group hover:scale-105 hover:shadow-lg`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <kpi.icon className={`h-5 w-5 bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`} />
              </div>
              <div className="flex items-center gap-1">
                {kpi.change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(kpi.change)}%
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              } mb-1`}>{kpi.value}</p>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-200' : 'text-slate-600'
              } font-medium`}>{kpi.title}</p>
            </div>

            {kpi.action && (
              <Button 
                onClick={kpi.action}
                size="sm"
                variant="outline"
                className="w-full text-xs gap-1"
              >
                <Plus className="h-3 w-3" />
                {kpi.actionLabel}
              </Button>
            )}
            
            {!kpi.action && (
              <Button 
                size="sm"
                variant="outline"
                className="w-full text-xs gap-1"
              >
                <ArrowUpRight className="h-3 w-3" />
                View Details
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
