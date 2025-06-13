
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceData } from '@/types/resource';

interface SkillsChartProps {
  data: ResourceData[];
}

export const SkillsChart = ({ data }: SkillsChartProps) => {
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
    <Card className="bg-white/70 backdrop-blur-lg border-white/30 hover:bg-white/80 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Top Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" fontSize={12} />
            <YAxis 
              type="category" 
              dataKey="skill" 
              stroke="#64748b" 
              fontSize={10}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
