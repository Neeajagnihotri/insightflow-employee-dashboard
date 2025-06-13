
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EmployeeData } from '@/types/employee';

interface BenchCategorizationChartProps {
  data: EmployeeData[];
}

export const BenchCategorizationChart = ({ data }: BenchCategorizationChartProps) => {
  const benchedEmployees = data.filter(emp => emp.status === 'Benched' && emp.benchCategory);
  
  const chartData = benchedEmployees.reduce((acc, emp) => {
    const category = emp.benchCategory!;
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <Card className="backdrop-blur-lg bg-white/40 border-white/20 hover:bg-white/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Bench Categorization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
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
