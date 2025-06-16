
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceData } from '@/types/resource';

interface ProjectTimelineChartProps {
  data: ResourceData[];
  isDarkMode?: boolean;
}

export const ProjectTimelineChart = ({ data, isDarkMode = false }: ProjectTimelineChartProps) => {
  const experienceData = data.reduce((acc, resource) => {
    const exp = resource.experience;
    const existing = acc.find(item => item.level === exp);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ level: exp, count: 1 });
    }
    return acc;
  }, [] as { level: string; count: number }[]);

  return (
    <Card className={`${
      isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
    } backdrop-blur-lg border-white/30 hover:${
      isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'
    } transition-all duration-300`}>
      <CardHeader>
        <CardTitle className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Experience Levels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={experienceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
            <XAxis 
              dataKey="level" 
              stroke={isDarkMode ? '#9CA3AF' : '#64748b'}
              fontSize={12}
            />
            <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
                backdropFilter: 'blur(10px)',
                color: isDarkMode ? '#F9FAFB' : '#1F2937'
              }}
            />
            <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
