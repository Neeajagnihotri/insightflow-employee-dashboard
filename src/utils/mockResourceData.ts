
import { ResourceData } from '@/types/resource';

const departments = ['Engineering', 'Product', 'Design', 'QA', 'Data', 'DevOps'];
const roles: ResourceData['role'][] = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 
  'DevOps Engineer', 'Scrum Master', 'Product Manager', 
  'Engineering Manager', 'QA Engineer', 'Data Analyst'
];
const experiences: ResourceData['experience'][] = ['Junior', 'Mid-Level', 'Senior', 'Lead'];
const statuses: ResourceData['status'][] = ['Available', 'Assigned', 'On Leave', 'Training'];
const locations = ['New York', 'San Francisco', 'London', 'Berlin', 'Toronto', 'Remote'];
const skills = [
  'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 
  'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST API',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Agile'
];
const projects = [
  'Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 
  'Project Epsilon', 'Project Zeta'
];

const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Blake', 'Sage', 'River', 'Phoenix', 'Rowan', 'Parker', 'Cameron', 'Drew'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
];

export const generateMockResourceData = (count: number = 150): ResourceData[] => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const experience = experiences[Math.floor(Math.random() * experiences.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    const resourceSkills = skills
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 2);
    
    const currentProject = status === 'Assigned' ? 
      projects[Math.floor(Math.random() * projects.length)] : undefined;
    
    return {
      id: `RES-${(index + 1).toString().padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      department,
      role,
      experience,
      status,
      utilizationRate: Math.floor(Math.random() * 40) + 60,
      skills: resourceSkills,
      currentProject,
      projectEndDate: currentProject ? 
        new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString() : 
        undefined,
      hireDate: new Date(Date.now() - Math.random() * 1095 * 24 * 60 * 60 * 1000).toISOString(),
      location,
      salary: Math.floor(Math.random() * 100000) + 50000,
      performanceRating: Math.floor(Math.random() * 3) + 3
    };
  });
};
