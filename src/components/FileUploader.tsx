import React, { useRef, useState } from 'react';
import { UploadIcon, FileIcon, FileSpreadsheetIcon, FileJsonIcon } from 'lucide-react';
import { DataFormat } from '../types';
import { readFileContent } from '../utils/fileHandling';

interface FileUploaderProps {
  onFileData: (data: string, format: DataFormat) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    try {
      setFileName(file.name);
      const fileExt = file.name.split('.').pop()?.toLowerCase() as DataFormat;
      const format: DataFormat = ['json', 'csv', 'xlsx'].includes(fileExt) ? fileExt : 'json';
      
      const content = await readFileContent(file, format);
      onFileData(content, format);
    } catch (error) {
      console.error('Error reading file:', error);
      // Could handle showing an error to the user here
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const getFileIcon = () => {
    if (!fileName) return <UploadIcon className="h-8 w-8 text-blue-500" />;
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'json':
        return <FileJsonIcon className="h-8 w-8 text-orange-500" />;
      case 'csv':
      case 'xlsx':
        return <FileSpreadsheetIcon className="h-8 w-8 text-green-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,.csv,.xlsx"
        className="hidden"
      />
      
      <div className="flex flex-col items-center">
        {getFileIcon()}
        
        <p className="mt-2 text-sm font-medium text-gray-900">
          {fileName ? fileName : 'Drag and drop a file or click to upload'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports JSON, CSV, and XLSX formats
        </p>
      </div>
    </div>
  );
};

export default FileUploader;