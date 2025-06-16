
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceData } from '@/types/resource';

interface SkillsChartProps {
  data: ResourceData[];
  isDarkMode?: boolean;
}

export const SkillsChart = ({ data, isDarkMode = false }: SkillsChartProps) => {
  const skillsCount = data.reduce((acc, resource) => {
    resource.skills.forEach(skill => {
      if (acc[skill]) {
        acc[skill]++;
      } else {
        acc[skill] = 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(skillsCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([skill, count], index) => ({ skill, count, id: `skill-${index}` }));

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
          Top Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
            <XAxis type="number" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
            <YAxis 
              type="category" 
              dataKey="skill" 
              stroke={isDarkMode ? '#9CA3AF' : '#64748b'} 
              fontSize={10}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
                backdropFilter: 'blur(10px)',
                color: isDarkMode ? '#F9FAFB' : '#1F2937'
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
