
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, Users, Activity } from 'lucide-react';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  analyticsData: any;
  isDarkMode: boolean;
}

export const AnalyticsModal = ({ isOpen, onClose, title, analyticsData, isDarkMode }: AnalyticsModalProps) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}_analytics_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const chartData = analyticsData?.departments || analyticsData?.byDepartment ? 
    Object.entries(analyticsData.departments || analyticsData.byDepartment).map(([name, value]) => ({
      name,
      value: value as number
    })) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {title} Analytics Report
            </span>
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Trend</span>
                </div>
                <p className="text-xl font-bold mt-2">{analyticsData?.trend || 'Stable'}</p>
              </CardContent>
            </Card>
            
            <Card className={isDarkMode ? 'bg-gray-700/50' : 'bg-green-50'}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Total Count</span>
                </div>
                <p className="text-xl font-bold mt-2">
                  {chartData.reduce((sum, item) => sum + item.value, 0)}
                </p>
              </CardContent>
            </Card>
            
            <Card className={isDarkMode ? 'bg-gray-700/50' : 'bg-purple-50'}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Performance</span>
                </div>
                <p className="text-xl font-bold mt-2">
                  {analyticsData?.rating || analyticsData?.efficiency || 'High'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          {chartData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={isDarkMode ? 'bg-gray-700/30' : 'bg-white/70'}>
                <CardHeader>
                  <CardTitle className="text-lg">Distribution Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e2e8f0'} />
                      <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#64748b'} fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          borderRadius: '12px',
                          border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
                        }}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? 'bg-gray-700/30' : 'bg-white/70'}>
                <CardHeader>
                  <CardTitle className="text-lg">Pie Chart View</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Detailed Analytics */}
          <Card className={isDarkMode ? 'bg-gray-700/30' : 'bg-white/70'}>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analyticsData || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-sm font-semibold">
                      {Array.isArray(value) ? value.join(', ') : 
                       typeof value === 'object' ? JSON.stringify(value) : 
                       String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
