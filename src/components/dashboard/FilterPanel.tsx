
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';
import { ResourceData } from '@/types/resource';

interface FilterPanelProps {
  filters: {
    department: string;
    status: string;
    experience: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  resourceData: ResourceData[];
}

export const FilterPanel = ({ filters, onFiltersChange, resourceData }: FilterPanelProps) => {
  const departments = [...new Set(resourceData.map(r => r.department))];
  const statuses = [...new Set(resourceData.map(r => r.status))];
  const experiences = [...new Set(resourceData.map(r => r.experience))];

  const updateFilter = (key: string, value: string) => {
    // Convert "all" values back to empty strings for filtering logic
    const filterValue = value === 'all' ? '' : value;
    onFiltersChange({ ...filters, [key]: filterValue });
  };

  const clearFilters = () => {
    onFiltersChange({ department: '', status: '', experience: '', search: '' });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="bg-white/70 backdrop-blur-lg border-white/30 sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto h-6 w-6 p-0 hover:bg-red-100"
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search resources..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-white/50 border-white/30"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Department</label>
          <Select value={filters.department || 'all'} onValueChange={(value) => updateFilter('department', value)}>
            <SelectTrigger className="bg-white/50 border-white/30">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
          <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="bg-white/50 border-white/30">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Experience</label>
          <Select value={filters.experience || 'all'} onValueChange={(value) => updateFilter('experience', value)}>
            <SelectTrigger className="bg-white/50 border-white/30">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {experiences.map((exp) => (
                <SelectItem key={exp} value={exp}>{exp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <div className="pt-2 border-t border-white/30">
            <p className="text-xs text-slate-500">
              Showing {resourceData.filter(r => {
                if (filters.department && r.department !== filters.department) return false;
                if (filters.status && r.status !== filters.status) return false;
                if (filters.experience && r.experience !== filters.experience) return false;
                if (filters.search) {
                  const searchLower = filters.search.toLowerCase();
                  return r.name.toLowerCase().includes(searchLower) ||
                         r.role.toLowerCase().includes(searchLower) ||
                         r.skills.some(skill => skill.toLowerCase().includes(searchLower));
                }
                return true;
              }).length} of {resourceData.length} resources
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
