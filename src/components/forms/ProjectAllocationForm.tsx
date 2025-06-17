
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ResourceData, ProjectData } from '@/types/resource';
import { Users, Target, Award, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExtendedResourceData extends ResourceData {
  matchScore: number;
  skillMatches: number;
  recommendationLevel: 'high' | 'medium' | 'low';
}

interface ProjectAllocationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (allocation: { resourceId: string; projectId: string; resourceName: string; projectName: string }) => void;
  resources: ResourceData[];
  projects: Array<ProjectData | { id: string; name: string }>;
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
  const [filteredResources, setFilteredResources] = useState<ExtendedResourceData[]>([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<ProjectData | null>(null);
  const { toast } = useToast();

  const availableResources = resources.filter(r => r.status === 'Available');

  // Filter resources based on project requirements
  useEffect(() => {
    if (selectedProject) {
      const project = projects.find(p => p.id === selectedProject);
      if (project && 'requiredSkills' in project) {
        setSelectedProjectDetails(project as ProjectData);
        
        // Score resources based on skill match and utilization
        const scoredResources: ExtendedResourceData[] = availableResources.map(resource => {
          const skillMatches = project.requiredSkills.filter(skill => 
            resource.skills.includes(skill)
          ).length;
          const skillScore = (skillMatches / Math.max(project.requiredSkills.length, 1)) * 100;
          const utilizationScore = 100 - resource.utilizationRate; // Lower utilization = higher availability
          const experienceScore = {
            'Junior': 25,
            'Mid-Level': 50,
            'Senior': 75,
            'Lead': 100
          }[resource.experience];
          
          const totalScore = (skillScore * 0.5) + (utilizationScore * 0.3) + (experienceScore * 0.2);
          
          return {
            ...resource,
            matchScore: Math.round(totalScore),
            skillMatches,
            recommendationLevel: totalScore >= 70 ? 'high' : totalScore >= 40 ? 'medium' : 'low'
          } as ExtendedResourceData;
        }).sort((a, b) => b.matchScore - a.matchScore);
        
        setFilteredResources(scoredResources);
      } else {
        setSelectedProjectDetails(null);
        const defaultScoredResources: ExtendedResourceData[] = availableResources.map(r => ({ 
          ...r, 
          matchScore: 50, 
          skillMatches: 0, 
          recommendationLevel: 'medium' as const 
        }));
        setFilteredResources(defaultScoredResources);
      }
    } else {
      setSelectedProjectDetails(null);
      const defaultScoredResources: ExtendedResourceData[] = availableResources.map(r => ({ 
        ...r, 
        matchScore: 50, 
        skillMatches: 0, 
        recommendationLevel: 'medium' as const 
      }));
      setFilteredResources(defaultScoredResources);
    }
  }, [selectedProject, availableResources, projects]);

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
      const resourceData = filteredResources.find(r => r.id === selectedResource);
      
      onSubmit({
        resourceId: selectedResource,
        projectId: selectedProject,
        resourceName: resource.name,
        projectName: project.name
      });
      
      toast({
        title: "Resource Allocated Successfully",
        description: `${resource.name} has been assigned to ${project.name}${resourceData?.matchScore ? ` (Match Score: ${resourceData.matchScore}%)` : ''}`,
      });
      
      setSelectedResource('');
      setSelectedProject('');
      onClose();
    }
  };

  const getRecommendationColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const selectedResourceData = filteredResources.find(r => r.id === selectedResource);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Smart Project Allocation
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project">Select Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex flex-col">
                          <span>{project.name}</span>
                          {'requiredSkills' in project && project.requiredSkills.length > 0 && (
                            <span className="text-xs text-gray-500">
                              Skills: {project.requiredSkills.slice(0, 3).join(', ')}
                              {project.requiredSkills.length > 3 && `... +${project.requiredSkills.length - 3} more`}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Project Details */}
              {selectedProjectDetails && (
                <Card className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'} border-blue-200`}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Project Requirements</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Required Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedProjectDetails.requiredSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedProjectDetails.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm">Budget: ${selectedProjectDetails.budget.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Resource Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resource">Select Resource (AI Recommended)</Label>
                <Select value={selectedResource} onValueChange={setSelectedResource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an available resource" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredResources.map((resource) => (
                      <SelectItem key={resource.id} value={resource.id}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span>{resource.name}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getRecommendationColor(resource.recommendationLevel)}`}
                              >
                                {resource.matchScore}% Match
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {resource.role} • {resource.department} • {resource.experience}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  {filteredResources.length} available resources (sorted by compatibility)
                </p>
              </div>

              {/* Selected Resource Details */}
              {selectedResourceData && (
                <Card className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-green-50'} border-green-200`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Resource Profile</h4>
                      <div className="flex items-center gap-1">
                        {selectedResourceData.recommendationLevel === 'high' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                        <Badge className={getRecommendationColor(selectedResourceData.recommendationLevel)}>
                          {selectedResourceData.recommendationLevel.toUpperCase()} MATCH
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{selectedResourceData.experience} {selectedResourceData.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm">{selectedResourceData.utilizationRate}% Utilized</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">Rating: {selectedResourceData.performanceRating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">${(selectedResourceData.salary / 1000).toFixed(0)}K</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium">Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedResourceData.skills.map((skill, index) => {
                          const isRequired = selectedProjectDetails?.requiredSkills.includes(skill);
                          return (
                            <Badge 
                              key={index} 
                              variant={isRequired ? "default" : "secondary"}
                              className={`text-xs ${isRequired ? 'bg-green-500 text-white' : ''}`}
                            >
                              {skill}
                              {isRequired && ' ✓'}
                            </Badge>
                          );
                        })}
                      </div>
                      {selectedProjectDetails && (
                        <p className="text-xs text-gray-600 mt-2">
                          Matching {selectedResourceData.skillMatches} of {selectedProjectDetails.requiredSkills.length} required skills
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-purple-600"
              disabled={!selectedResource || !selectedProject}
            >
              Allocate Resource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
