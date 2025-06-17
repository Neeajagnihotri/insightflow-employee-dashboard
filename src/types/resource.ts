export interface ResourceData {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'Frontend Developer' | 'Backend Developer' | 'Full Stack Developer' | 'DevOps Engineer' | 'Scrum Master' | 'Product Manager' | 'Engineering Manager' | 'QA Engineer' | 'Data Analyst';
  experience: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
  status: 'Available' | 'Assigned' | 'On Leave' | 'Training';
  utilizationRate: number;
  skills: string[];
  currentProject?: string;
  projectEndDate?: string;
  hireDate: string;
  location: string;
  salary: number;
  performanceRating: number;
  // Additional properties for smart allocation
  matchScore?: number;
  skillMatches?: number;
  recommendationLevel?: 'high' | 'medium' | 'low';
}

export interface KPIData {
  totalResources: number;
  availableResources: number;
  assignedResources: number;
  onLeaveResources: number;
  inTrainingResources: number;
  averageUtilization: number;
  averageSalary: number;
  totalProjectCost: number;
  trends: {
    totalChange: number;
    availableChange: number;
    assignedChange: number;
    utilizationChange: number;
    salaryTrend: number;
  };
}

export interface ProjectData {
  id: string;
  name: string;
  clientName?: string;
  engineeringManager?: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed';
  startDate: string;
  endDate?: string;
  budget?: number;
  requiredSkills: string[];
  assignedResources: string[];
}
