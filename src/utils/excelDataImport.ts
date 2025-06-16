
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
        role: row.role || 'Developer',
        department: row.department || 'Engineering',
        status: row.status || 'Available',
        experience: row.experience || 'Mid-level',
        skills: row.skills ? row.skills.split(';').map((s: string) => s.trim()) : ['JavaScript', 'React'],
        utilizationRate: parseInt(row.utilizationRate) || Math.floor(Math.random() * 40) + 60,
        performanceRating: parseFloat(row.performanceRating) || Math.random() * 2 + 3,
        startDate: new Date(row.startDate || Date.now()),
        projectCount: parseInt(row.projectCount) || Math.floor(Math.random() * 5) + 1,
        certifications: row.certifications ? row.certifications.split(';') : []
      } as ResourceData;
    });
};

export const downloadSampleExcel = () => {
  const sampleData = `name,role,department,status,experience,skills,utilizationRate,performanceRating,startDate,projectCount,certifications
John Doe,Senior Developer,Engineering,Available,Senior,JavaScript;React;Node.js,85,4.5,2023-01-15,3,AWS Certified;React Certified
Jane Smith,UI Designer,Design,Assigned,Mid-level,Figma;Adobe XD;CSS,90,4.2,2023-03-20,2,UX Certification
Mike Johnson,Project Manager,Management,Available,Senior,Leadership;Agile;Scrum,75,4.8,2022-11-10,5,PMP Certified
Sarah Wilson,Data Analyst,Analytics,Training,Junior,Python;SQL;Tableau,60,3.9,2023-06-01,1,Google Analytics`;

  const blob = new Blob([sampleData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sample_employee_data.csv';
  link.click();
  URL.revokeObjectURL(url);
};
