
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ResourceData } from '@/types/resource';

interface ProjectAllocationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (allocation: { resourceId: string; projectId: string; resourceName: string; projectName: string }) => void;
  resources: ResourceData[];
  projects: Array<{ id: string; name: string }>;
  isDarkMode?: boolean;
}

export const ProjectAllocationForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  resources, 
  projects, 
  isDarkMode 
}: ProjectAllocationFormProps) => {
  const [selectedResource, setSelectedResource] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const { toast } = useToast();

  const availableResources = resources.filter(r => r.status === 'Available');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedResource || !selectedProject) {
      toast({
        title: "Selection Required",
        description: "Please select both a resource and a project",
        variant: "destructive",
      });
      return;
    }

    const resource = resources.find(r => r.id === selectedResource);
    const project = projects.find(p => p.id === selectedProject);

    if (resource && project) {
      onSubmit({
        resourceId: selectedResource,
        projectId: selectedProject,
        resourceName: resource.name,
        projectName: project.name
      });
      
      toast({
        title: "Resource Allocated",
        description: `${resource.name} has been assigned to ${project.name}`,
      });
      
      setSelectedResource('');
      setSelectedProject('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle>Project Allocation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resource">Select Resource</Label>
            <Select value={selectedResource} onValueChange={setSelectedResource}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an available resource" />
              </SelectTrigger>
              <SelectContent>
                {availableResources.map((resource) => (
                  <SelectItem key={resource.id} value={resource.id}>
                    {resource.name} - {resource.role} ({resource.department})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              {availableResources.length} available resources
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600">
              Allocate Resource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
