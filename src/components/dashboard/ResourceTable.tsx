
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, DollarSign } from 'lucide-react';
import { ResourceData } from '@/types/resource';

interface ResourceTableProps {
  data: ResourceData[];
  isDarkMode?: boolean;
}

export const ResourceTable = ({ data, isDarkMode = false }: ResourceTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'On Leave': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Training': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Junior': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Mid-Level': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Senior': return 'bg-green-100 text-green-800 border-green-200';
      case 'Lead': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatSalary = (salary: number) => {
    if (salary >= 1000000) {
      return `$${(salary / 1000000).toFixed(1)}M`;
    } else if (salary >= 1000) {
      return `$${(salary / 1000).toFixed(0)}K`;
    }
    return `$${salary}`;
  };

  return (
    <Card className={`${
      isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
    } backdrop-blur-lg border-white/30`}>
      <CardHeader>
        <CardTitle className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Resource Directory ({data.length} resources)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Resource</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Role</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Department</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Experience</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Status</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Utilization</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Salary</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Skills</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-200' : ''}>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((resource) => (
                <TableRow key={resource.id} className={`hover:${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
                } transition-colors`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-xs">
                          {resource.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className={`font-medium text-sm ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{resource.name}</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-slate-500'
                        }`}>{resource.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={`font-medium text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{resource.role}</TableCell>
                  <TableCell className={`text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{resource.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getExperienceColor(resource.experience)}`}>
                      {resource.experience}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${resource.utilizationRate}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>{resource.utilizationRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-500" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>{formatSalary(resource.salary)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-32">
                      {resource.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-indigo-100 text-indigo-700">
                          {skill}
                        </Badge>
                      ))}
                      {resource.skills.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{resource.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={`text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{resource.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} resources
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${
                  isDarkMode 
                    ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                    : 'bg-white/60 hover:bg-white/80 border-white/30'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className={`text-sm font-medium px-3 py-1 ${
                isDarkMode 
                  ? 'bg-gray-700/60 border-gray-600/30 text-gray-200' 
                  : 'bg-white/60 border-white/30'
              } rounded border`}>
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${
                  isDarkMode 
                    ? 'bg-gray-700/60 hover:bg-gray-600/80 border-gray-600/30 text-gray-200' 
                    : 'bg-white/60 hover:bg-white/80 border-white/30'
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
