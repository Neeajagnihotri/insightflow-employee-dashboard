
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ResourceData } from '@/types/resource';

interface DepartmentChartProps {
  data: ResourceData[];
  isDarkMode?: boolean;
}

export const DepartmentChart = ({ data, isDarkMode = false }: DepartmentChartProps) => {
  const departmentData = data.reduce((acc, resource) => {
    const dept = resource.department;
    const existing = acc.find(item => item.name === dept);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: dept, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

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
          Department Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
                backdropFilter: 'blur(10px)',
                color: isDarkMode ? '#F9FAFB' : '#1F2937'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
