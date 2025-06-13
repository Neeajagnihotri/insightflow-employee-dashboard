
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceData } from '@/types/resource';

interface ProjectTimelineChartProps {
  data: ResourceData[];
}

export const ProjectTimelineChart = ({ data }: ProjectTimelineChartProps) => {
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
    <Card className="bg-white/70 backdrop-blur-lg border-white/30 hover:bg-white/80 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Experience Levels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={experienceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="level" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
