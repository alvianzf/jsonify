/**
 * Simple CSV parser
 * Note: This is a basic implementation; for production use,
 * consider using a robust library like papaparse
 */
export const parseCSV = async (csvString: string): Promise<any[]> => {
  try {
    // Split by lines
    const lines = csvString.trim().split(/\r?\n/);
    if (lines.length === 0) return [];
    
    // Get headers from the first line
    const headers = splitCSVLine(lines[0]);
    
    // Parse rows
    const result: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = splitCSVLine(line);
      const obj: any = {};
      
      headers.forEach((header, index) => {
        // Handle missing values
        obj[header] = index < values.length ? normalizeValue(values[index]) : '';
      });
      
      result.push(obj);
    }
    
    return result;
  } catch (error) {
    throw new Error(`Error parsing CSV: ${(error as Error).message}`);
  }
};

/**
 * Split a CSV line respecting quoted values with commas
 */
const splitCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  
  // Remove quotes from quoted fields
  return result.map(field => {
    if (field.startsWith('"') && field.endsWith('"')) {
      return field.slice(1, -1);
    }
    return field;
  });
};

/**
 * Try to normalize CSV values to appropriate types
 * (e.g., convert "123" to a number and "true" to a boolean)
 */
const normalizeValue = (value: string): any => {
  const trimmed = value.trim();
  
  // Check for empty values
  if (trimmed === '') return '';
  
  // Check for booleans
  if (trimmed.toLowerCase() === 'true') return true;
  if (trimmed.toLowerCase() === 'false') return false;
  
  // Check for numbers
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const num = parseFloat(trimmed);
    if (!isNaN(num)) return num;
  }
  
  // Default to string
  return trimmed;
};