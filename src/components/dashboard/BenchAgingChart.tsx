
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EmployeeData } from '@/types/employee';

interface BenchAgingChartProps {
  data: EmployeeData[];
}

export const BenchAgingChart = ({ data }: BenchAgingChartProps) => {
  const benchedEmployees = data.filter(emp => emp.status === 'Benched' && emp.benchDays);
  
  const agingData = [
    { name: '≤15 Days', value: benchedEmployees.filter(emp => emp.benchDays! <= 15).length },
    { name: '15-45 Days', value: benchedEmployees.filter(emp => emp.benchDays! > 15 && emp.benchDays! <= 45).length },
    { name: '>45 Days', value: benchedEmployees.filter(emp => emp.benchDays! > 45).length },
  ];

  const COLORS = ['#22c55e', '#eab308', '#ef4444'];

  return (
    <Card className="backdrop-blur-lg bg-white/40 border-white/20 hover:bg-white/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Bench Aging
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={agingData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {agingData.map((entry, index) => (
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
