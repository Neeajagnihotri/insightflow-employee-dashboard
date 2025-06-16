
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wifi, Clock } from 'lucide-react';

interface RealTimeIndicatorProps {
  lastUpdated: Date;
  isDarkMode: boolean;
}

export const RealTimeIndicator = ({ lastUpdated, isDarkMode }: RealTimeIndicatorProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className={`${
      isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'
    } backdrop-blur-lg border-white/30 hover:bg-opacity-80 transition-all duration-300`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Live</span>
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-slate-500'}`}>•</span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-slate-500'}`}>
              Auto-refresh every 30s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-slate-500'}`}>
              Last updated: {formatTime(lastUpdated)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
