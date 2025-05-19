import React, { useState } from 'react';
import FileUploader from './FileUploader';
import TextEditor from './TextEditor';
import OutputViewer from './OutputViewer';
import UrlInput from './UrlInput';
import { DataFormat, ProcessedData } from '../types';
import { processData } from '../utils/dataProcessing';

const DataProcessor: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [inputFormat, setInputFormat] = useState<DataFormat>('json');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDataSubmit = async () => {
    if (!input.trim()) {
      setError('Please enter or upload some data to process.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await processData(input, inputFormat);
      setProcessedData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the data.');
      setProcessedData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileData = (data: string, format: DataFormat) => {
    setInput(data);
    setInputFormat(format);
  };

  const handleUrlData = (data: string) => {
    setInput(data);
    setInputFormat('json');
  };

  const handleFormatChange = (format: DataFormat) => {
    setInputFormat(format);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Input Data</h2>
          
          <div className="space-y-6">
            <UrlInput onUrlData={handleUrlData} />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <FileUploader onFileData={handleFileData} />
          </div>
          
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-700 mr-3">Format:</span>
              <div className="flex space-x-2">
                {(['json', 'csv', 'xlsx'] as DataFormat[]).map((format) => (
                  <button
                    key={format}
                    className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                      inputFormat === format
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleFormatChange(format)}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <TextEditor
              value={input}
              onChange={setInput}
              format={inputFormat}
              placeholder={`Paste your ${inputFormat.toUpperCase()} data here or upload a file...`}
            />
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDataSubmit}
                disabled={isProcessing || !input.trim()}
              >
                {isProcessing ? 'Processing...' : 'Process Data'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {processedData && (
        <OutputViewer data={processedData} />
      )}
    </div>
  );
};

export default DataProcessor;