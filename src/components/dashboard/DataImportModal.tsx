
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { parseExcelData, downloadSampleExcel } from '@/utils/excelDataImport';
import { ResourceData } from '@/types/resource';

interface DataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImport: (data: ResourceData[]) => void;
  isDarkMode: boolean;
}

export const DataImportModal = ({ isOpen, onClose, onDataImport, isDarkMode }: DataImportModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(csv|xlsx|xls)$/)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const text = await file.text();
      const data = parseExcelData(text);
      
      onDataImport(data);
      
      toast({
        title: "Data Imported Successfully",
        description: `Imported ${data.length} records from ${file.name}`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to process the file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Employee Data
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upload Area */}
          <Card 
            className={`border-2 border-dashed transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : isDarkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className={`p-3 rounded-full ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-medium mb-2">
                    Drop your Excel file here or click to browse
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Supports .csv, .xlsx, .xls files
                  </p>
                </div>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-input"
                  disabled={isProcessing}
                />
                <Button 
                  onClick={() => document.getElementById('file-input')?.click()}
                  disabled={isProcessing}
                  className="mt-2"
                >
                  {isProcessing ? 'Processing...' : 'Select File'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sample Download */}
          <Card className={isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                    Need a template?
                  </h4>
                  <p className={`text-sm mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Download our sample Excel template with the correct format and example data.
                  </p>
                  <Button 
                    onClick={downloadSampleExcel}
                    variant="outline" 
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Sample Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Format */}
          <div>
            <h4 className="font-medium mb-2">Expected Columns:</h4>
            <div className={`text-sm p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}>
              <p className="font-mono">
                name, role, department, status, experience, skills, utilizationRate, performanceRating, startDate, projectCount, certifications
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
