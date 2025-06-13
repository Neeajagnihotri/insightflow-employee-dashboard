
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EmployeeData } from '@/types/employee';

interface ExperienceChartProps {
  data: EmployeeData[];
}

export const ExperienceChart = ({ data }: ExperienceChartProps) => {
  const experienceData = data.reduce((acc, emp) => {
    const experience = emp.experience;
    const existing = acc.find(item => item.name === experience);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: experience, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981'];

  return (
    <Card className="backdrop-blur-lg bg-white/40 border-white/20 hover:bg-white/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Experience Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={experienceData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {experienceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
