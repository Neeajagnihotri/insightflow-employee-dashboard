
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResourceData } from '@/types/resource';

interface UtilizationChartProps {
  data: ResourceData[];
  isDarkMode?: boolean;
}

export const UtilizationChart = ({ data, isDarkMode = false }: UtilizationChartProps) => {
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
    <Card className={`${
      isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
    } backdrop-blur-lg border-white/30 hover:${
      isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'
    } transition-all duration-300`}>
      <CardHeader>
        <CardTitle className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Average Utilization by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
            <XAxis 
              dataKey="department" 
              stroke={isDarkMode ? '#9CA3AF' : '#64748b'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDarkMode ? '#9CA3AF' : '#64748b'} 
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
                backdropFilter: 'blur(10px)',
                color: isDarkMode ? '#F9FAFB' : '#1F2937'
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
