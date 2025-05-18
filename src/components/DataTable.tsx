import React, { useState, useMemo } from 'react';
import { SearchIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { columns, flattenedData } = useMemo(() => {
    try {
      const columns = new Set<string>();
      const flattenedData: Record<string, any>[] = [];

      const flatten = (obj: any, prefix = ''): Record<string, any> => {
        let result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            result = { ...result, ...flatten(value, fullKey) };
          } else {
            result[fullKey] = Array.isArray(value) ? value.map(i => (typeof i === 'object' ? JSON.stringify(i) : i)).join(', ') : value;
          }
          columns.add(fullKey);
        }
        return result;
      };

      data.forEach(d => flattenedData.push(flatten(d)));
      return { columns: Array.from(columns), flattenedData };
    } catch (err) {
      toast.error('Failed to process table data');
      return { columns: [], flattenedData: [] };
    }
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return flattenedData;
    const s = searchTerm.toLowerCase();
    return flattenedData.filter(row =>
      Object.values(row).some(val => val && String(val).toLowerCase().includes(s))
    );
  }, [flattenedData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const formatColumnHeader = (h: string): string =>
    h.split('.').map(k => k[0].toUpperCase() + k.slice(1)).join(' › ');

  const RecursiveJSON: React.FC<{ value: any }> = ({ value }) => {
    const [open, setOpen] = useState(false);

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === 'object' && parsed !== null) value = parsed;
      } catch {
        return <span>{value}</span>;
      }
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div>
          <button className="flex items-center text-blue-600" onClick={() => setOpen(!open)}>
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />} <span className="ml-1">Details</span>
          </button>
          {open && (
            <table className="ml-4 mt-1 text-xs border border-gray-200">
              <tbody>
                {Object.entries(value).map(([k, v]) => (
                  <tr key={k}>
                    <td className="border px-2 py-1 font-semibold">{k}</td>
                    <td className="border px-2 py-1">
                      <RecursiveJSON value={v} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    }

    if (value === null || value === undefined) return <span className="text-gray-400">null</span>;
    if (typeof value === 'boolean') return <span className={value ? 'text-green-600' : 'text-red-600'}>{String(value)}</span>;

    return <span>{String(value)}</span>;
  };

  if (!data.length) return <div className="text-center py-8 text-gray-500">No data available</div>;

  return (
    <div>
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search data..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {formatColumnHeader(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pageData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((col, j) => (
                  <td key={j} className="px-6 py-4 text-sm text-gray-600 break-words">
                    <RecursiveJSON value={row[col]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end gap-2 text-sm mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="py-1">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
