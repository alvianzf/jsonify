export type DataFormat = 'json' | 'csv' | 'xlsx';

export interface ProcessedData {
  data: any[];           // Array of objects parsed from the input
  json: string;          // Formatted JSON string
  format: DataFormat;    // Original format of the input
  isValid: boolean;      // Whether the input is valid
  size?: string;         // Human-readable size of the data
  records?: number;      // Number of records in the data
  error?: string;        // Error message if processing failed
}