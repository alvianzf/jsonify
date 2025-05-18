import React from 'react';
import { DataFormat } from '../types';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  format: DataFormat;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  format,
  placeholder = 'Enter your data here...',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Handle paste event to auto-format JSON
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (format === 'json') {
      // This is optional, but we could try to auto-format JSON on paste
      try {
        const text = e.clipboardData.getData('text');
        const parsed = JSON.parse(text);
        // Only prevent default if we successfully parsed JSON
        e.preventDefault();
        onChange(JSON.stringify(parsed, null, 2));
      } catch (error) {
        // If parsing fails, let the default paste happen
      }
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        spellCheck={false}
        data-format={format}
      />
      <div className="absolute top-2 right-2">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
          {format.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TextEditor;