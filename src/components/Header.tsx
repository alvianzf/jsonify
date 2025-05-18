import React from 'react';
import { FileBoxIcon as FileBeautyIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileBeautyIcon className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">JSONify</span>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;