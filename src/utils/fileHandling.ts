import { DataFormat } from '../types';

/**
 * Read file content based on the file format
 */
export const readFileContent = async (
  file: File,
  format: DataFormat
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target?.result) {
        reject(new Error('Failed to read file content'));
        return;
      }
      
      const content = event.target.result as string;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    if (format === 'xlsx') {
      // For XLSX files, we need to read as array buffer and convert later
      reader.readAsArrayBuffer(file);
    } else {
      // For JSON and CSV, read as text
      reader.readAsText(file);
    }
  });
};