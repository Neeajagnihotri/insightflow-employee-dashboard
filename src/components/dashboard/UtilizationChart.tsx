
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceData } from '@/types/resource';

interface UtilizationChartProps {
  data: ResourceData[];
}

export const UtilizationChart = ({ data }: UtilizationChartProps) => {
  const utilizationData = data.reduce((acc, resource) => {
    const dept = resource.department;
    if (!acc[dept]) {
      acc[dept] = { department: dept, utilization: 0, count: 0 };
    }
    acc[dept].utilization += resource.utilizationRate;
    acc[dept].count++;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(utilizationData).map((item: any) => ({
    department: item.department,
    utilization: Math.round(item.utilization / item.count)
  }));

  return (
    <Card className="bg-white/70 backdrop-blur-lg border-white/30 hover:bg-white/80 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Average Utilization by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="department" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                backdropFilter: 'blur(10px)'
              }}
              formatter={(value) => [`${value}%`, 'Utilization']}
            />
            <Line 
              type="monotone" 
              dataKey="utilization" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
