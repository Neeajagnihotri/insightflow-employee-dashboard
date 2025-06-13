
export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'Frontend' | 'Backend' | 'Full Stack' | 'DevOps' | 'Scrum Master' | 'Product Manager' | 'Engineering Manager';
  experience: 'Junior' | 'Mid-Senior' | 'Senior';
  status: 'Billable' | 'Benched' | 'Shadow' | 'Intern';
  benchCategory?: 'Training' | 'Internal Project' | 'No Plan';
  benchDays?: number;
  hireDate: string;
  region: string;
  utilizationRate: number;
}

export interface KPIData {
  total: number;
  billable: number;
  benched: number;
  shadow: number;
  interns: number;
  trends: {
    totalChange: number;
    billableChange: number;
    benchedChange: number;
    shadowChange: number;
    internsChange: number;
  };
}
