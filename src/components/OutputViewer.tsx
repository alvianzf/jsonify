import React, { useState } from 'react';
import { CopyIcon, TableIcon, CodeIcon, CheckIcon, TreesIcon as TreeIcon } from 'lucide-react';
import { ProcessedData } from '../types';
import DataTable from './DataTable';
import JsonStructure from './JsonStructure';

interface OutputViewerProps {
  data: ProcessedData;
}

const OutputViewer: React.FC<OutputViewerProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'json' | 'table' | 'structure'>('json');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="border-b border-gray-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">Output</h2>
          
          <div className="flex space-x-2">
            <button
              className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'json'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setViewMode('json')}
            >
              <CodeIcon size={16} className="mr-1" />
              JSON
            </button>
            <button
              className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setViewMode('table')}
            >
              <TableIcon size={16} className="mr-1" />
              Table
            </button>
            <button
              className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                viewMode === 'structure'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setViewMode('structure')}
            >
              <TreeIcon size={16} className="mr-1" />
              Structure
            </button>
            
            <button
              className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <CheckIcon size={16} className="mr-1 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon size={16} className="mr-1" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {viewMode === 'json' && (
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-md overflow-auto max-h-96 border border-gray-200">
            {data.json}
          </pre>
        )}
        
        {viewMode === 'table' && (
          <DataTable data={data.data} />
        )}

        {viewMode === 'structure' && (
          <JsonStructure data={data.data} />
        )}
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Status:</span>
          <span className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${data.isValid ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {data.isValid ? 'Valid' : 'Invalid'} {data.format.toUpperCase()}
          </span>
          
          {data.size && (
            <span className="ml-4">
              <span className="font-medium mr-2">Size:</span>
              {data.size}
            </span>
          )}
          
          {data.records !== undefined && (
            <span className="ml-4">
              <span className="font-medium mr-2">Records:</span>
              {data.records}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputViewer;