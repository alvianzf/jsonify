import { DataFormat, ProcessedData } from '../types';
import { parseCSV } from './parsers/csvParser';
import { parseExcel } from './parsers/excelParser';

/**
 * Process data from different formats (JSON, CSV, XLSX) into a normalized format
 */
export const processData = async (
  input: string,
  format: DataFormat
): Promise<ProcessedData> => {
  try {
    let data: any[] = [];
    let isValid = false;
    
    // Parse based on format
    switch (format) {
      case 'json':
        try {
          data = JSON.parse(input);
          isValid = true;
          
          // Handle non-array JSON
          if (!Array.isArray(data)) {
            // If it's an object, wrap it in an array
            if (typeof data === 'object' && data !== null) {
              data = [data];
            } else {
              // For primitive values, create an object with a "value" property
              data = [{ value: data }];
            }
          }
        } catch (error) {
          throw new Error(`Invalid JSON: ${(error as Error).message}`);
        }
        break;
        
      case 'csv':
        data = await parseCSV(input);
        isValid = data.length > 0;
        break;
        
      case 'xlsx':
        data = await parseExcel(input);
        isValid = data.length > 0;
        break;
        
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
    
    // Format the data as pretty JSON regardless of input format
    const formattedJson = JSON.stringify(data, null, 2);
    
    // Calculate size
    const sizeInBytes = new Blob([formattedJson]).size;
    const size = formatSize(sizeInBytes);
    
    return {
      data,
      json: formattedJson,
      format,
      isValid,
      size,
      records: data.length,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Format bytes to human-readable size
 */
const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};