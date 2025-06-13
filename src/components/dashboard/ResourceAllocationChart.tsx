
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ResourceData } from '@/types/resource';

interface ResourceAllocationChartProps {
  data: ResourceData[];
}

export const ResourceAllocationChart = ({ data }: ResourceAllocationChartProps) => {
  const chartData = data.reduce((acc, resource) => {
    const dept = resource.department;
    if (!acc[dept]) {
      acc[dept] = { department: dept, Available: 0, Assigned: 0, 'On Leave': 0, Training: 0 };
    }
    acc[dept][resource.status]++;
    return acc;
  }, {} as Record<string, any>);

  const formattedData = Object.values(chartData);

  return (
    <Card className="bg-white/70 backdrop-blur-lg border-white/30 hover:bg-white/80 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          Resource Allocation by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="department" 
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
            <Legend />
            <Bar dataKey="Available" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Assigned" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="On Leave" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Training" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
