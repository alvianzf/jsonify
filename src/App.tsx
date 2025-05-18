import React from 'react';
import { FileBoxIcon as FileBeautyIcon } from 'lucide-react';
import DataProcessor from './components/DataProcessor';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <FileBeautyIcon size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter & Validator</h1>
            <p className="text-lg text-gray-600">
              Beautify, validate and convert between JSON, CSV, and XLSX formats
            </p>
          </div>
          
          <DataProcessor />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;