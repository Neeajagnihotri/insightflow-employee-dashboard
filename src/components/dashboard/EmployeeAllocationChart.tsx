
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { EmployeeData } from '@/types/employee';

interface EmployeeAllocationChartProps {
  data: EmployeeData[];
}

export const EmployeeAllocationChart = ({ data }: EmployeeAllocationChartProps) => {
  const chartData = data.reduce((acc, emp) => {
    const dept = emp.department;
    if (!acc[dept]) {
      acc[dept] = { department: dept, Billable: 0, Benched: 0, Shadow: 0, Intern: 0 };
    }
    acc[dept][emp.status]++;
    return acc;
  }, {} as Record<string, any>);

  const formattedData = Object.values(chartData);

  return (
    <Card className="backdrop-blur-lg bg-white/40 border-white/20 hover:bg-white/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Employee Allocation by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="department" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Legend />
            <Bar dataKey="Billable" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Benched" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Shadow" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Intern" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
