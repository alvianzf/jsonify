import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface JsonStructureProps {
  data: any;
}

const JsonStructure: React.FC<JsonStructureProps> = ({ data }) => {
  const getStructure = (obj: any): Record<string, any> => {
    const structure: Record<string, any> = {};

    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        // For arrays, analyze the first item to get the structure
        structure['[]'] = getStructure(obj[0]);
      }
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object') {
          structure[key] = getStructure(value);
        } else {
          structure[key] = typeof value;
        }
      });
    }

    return structure;
  };

  const renderStructure = (structure: Record<string, any>, level = 0, isLast = true): React.ReactNode => {
    return Object.entries(structure).map(([key, value], index, array) => {
      const isLastItem = index === array.length - 1;
      const hasChildren = typeof value === 'object';
      const isArray = key === '[]';
      
      return (
        <div
          key={key}
          className={`
            ${level > 0 ? 'ml-4' : ''}
            ${!isLastItem ? 'mb-1' : ''}
          `}
        >
          <div className="flex items-center">
            <div className="flex items-center text-gray-700">
              {hasChildren ? (
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              )}
              <span className={`ml-1 ${isArray ? 'text-purple-600' : 'text-blue-600'}`}>
                {isArray ? 'Array' : key}
              </span>
              {!hasChildren && (
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {value}
                </span>
              )}
            </div>
          </div>
          {hasChildren && (
            <div className="border-l-2 border-gray-200 ml-2 pl-2">
              {renderStructure(value, level + 1, isLastItem)}
            </div>
          )}
        </div>
      );
    });
  };

  const structure = getStructure(Array.isArray(data) ? data[0] : data);

  return (
    <div className="bg-white p-4 rounded-md border border-gray-200">
      <div className="text-sm font-medium text-gray-700 mb-2">Structure</div>
      <div className="text-sm">{renderStructure(structure)}</div>
    </div>
  );
};

export default JsonStructure;