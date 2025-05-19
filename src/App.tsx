import React from 'react';
import { FileBoxIcon as FileBeautyIcon } from 'lucide-react';
import DataProcessor from './components/DataProcessor';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-200">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="min-h-screen backdrop-blur-sm flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-glass-light dark:bg-glass-dark backdrop-blur-sm text-blue-600 dark:text-blue-400 mb-4">
                <FileBeautyIcon size={28} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">JSON Formatter & Validator</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Beautify, validate and convert between JSON, CSV, and XLSX formats
              </p>
            </div>
            
            <DataProcessor />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;