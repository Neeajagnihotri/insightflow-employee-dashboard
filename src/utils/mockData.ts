
import { EmployeeData } from '@/types/employee';

const roles = ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Scrum Master', 'Product Manager', 'Engineering Manager'] as const;
const experiences = ['Junior', 'Mid-Senior', 'Senior'] as const;
const statuses = ['Billable', 'Benched', 'Shadow', 'Intern'] as const;
const benchCategories = ['Training', 'Internal Project', 'No Plan'] as const;
const departments = ['Engineering', 'Product', 'Design', 'QA', 'DevOps'];
const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];

const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Chris', 'Amanda'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

export const generateMockEmployeeData = (): EmployeeData[] => {
  const employees: EmployeeData[] = [];
  
  for (let i = 1; i <= 250; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const employee: EmployeeData = {
      id: `EMP${i.toString().padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      experience: experiences[Math.floor(Math.random() * experiences.length)],
      status,
      hireDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      region: regions[Math.floor(Math.random() * regions.length)],
      utilizationRate: Math.floor(Math.random() * 100) + 1,
    };
    
    if (status === 'Benched') {
      employee.benchCategory = benchCategories[Math.floor(Math.random() * benchCategories.length)];
      employee.benchDays = Math.floor(Math.random() * 90) + 1;
    }
    
    employees.push(employee);
  }
  
  return employees;
};
