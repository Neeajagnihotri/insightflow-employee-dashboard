
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EmployeeData } from '@/types/employee';

interface RoleDistributionChartProps {
  data: EmployeeData[];
}

export const RoleDistributionChart = ({ data }: RoleDistributionChartProps) => {
  const roleData = data.reduce((acc, emp) => {
    const role = emp.role;
    const existing = acc.find(item => item.role === role);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ role, count: 1 });
    }
    return acc;
  }, [] as { role: string; count: number }[]);

  return (
    <Card className="backdrop-blur-lg bg-white/40 border-white/20 hover:bg-white/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Role Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={roleData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis type="number" stroke="#6b7280" fontSize={12} />
            <YAxis 
              type="category" 
              dataKey="role" 
              stroke="#6b7280" 
              fontSize={10}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
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
