
import { ResourceData } from '@/types/resource';

export interface ExcelDataRow {
  name: string;
  role: string;
  department: string;
  status: string;
  experience: string;
  skills: string;
  utilizationRate: number;
  performanceRating: number;
}

export const parseExcelData = (csvText: string): ResourceData[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, i) => {
        row[header] = values[i] || '';
      });

      return {
        id: `excel-${index}`,
        name: row.name || `Employee ${index + 1}`,
        email: row.email || `employee${index + 1}@company.com`,
        role: (row.role || 'Frontend Developer') as ResourceData['role'],
        department: row.department || 'Engineering',
        status: (row.status || 'Available') as ResourceData['status'],
        experience: (row.experience || 'Mid-Level') as ResourceData['experience'],
        skills: row.skills ? row.skills.split(';').map((s: string) => s.trim()) : ['JavaScript', 'React'],
        utilizationRate: parseInt(row.utilizationRate) || Math.floor(Math.random() * 40) + 60,
        performanceRating: parseFloat(row.performanceRating) || Math.random() * 2 + 3,
        hireDate: row.hireDate || new Date().toISOString().split('T')[0],
        location: row.location || 'Remote',
        salary: parseInt(row.salary) || Math.floor(Math.random() * 50000) + 80000,
        currentProject: row.currentProject || undefined,
        projectEndDate: row.projectEndDate || undefined
      } as ResourceData;
    });
};

export const downloadSampleExcel = () => {
  const sampleData = `name,email,role,department,status,experience,skills,utilizationRate,performanceRating,hireDate,location,salary,currentProject,projectEndDate
John Doe,john.doe@company.com,Senior Developer,Engineering,Available,Senior,JavaScript;React;Node.js,85,4.5,2023-01-15,New York,120000,Project Alpha,2024-06-30
Jane Smith,jane.smith@company.com,UI Designer,Design,Assigned,Mid-Level,Figma;Adobe XD;CSS,90,4.2,2023-03-20,San Francisco,95000,Project Beta,2024-05-15
Mike Johnson,mike.johnson@company.com,Project Manager,Management,Available,Senior,Leadership;Agile;Scrum,75,4.8,2022-11-10,Remote,110000,,
Sarah Wilson,sarah.wilson@company.com,Data Analyst,Analytics,Training,Junior,Python;SQL;Tableau,60,3.9,2023-06-01,Chicago,85000,Training Program,2024-03-01`;

  const blob = new Blob([sampleData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sample_employee_data.csv';
  link.click();
  URL.revokeObjectURL(url);
};
