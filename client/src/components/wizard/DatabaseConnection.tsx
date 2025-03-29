import { useState } from 'react';
import { Button } from '../ui/Button';

const mockTables = [
  { name: 'users', columns: ['id', 'name', 'email', 'created_at'] },
  { name: 'products', columns: ['id', 'name', 'price', 'description', 'category_id'] },
  { name: 'orders', columns: ['id', 'user_id', 'total', 'status', 'created_at'] },
];

export default function DatabaseConnection({ formData, updateFormData }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [tables, setTables] = useState([]);

  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate API call to connect to database
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setTables(mockTables);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Database Connection</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Supabase API Key
          </label>
          <div className="flex">
            <input
              type="text"
              value={formData.supabaseKey}
              onChange={(e) => updateFormData({ supabaseKey: e.target.value })}
              placeholder="Enter your Supabase API key"
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              type={isConnected ? "password" : "text"}
            />
            <Button
              variant={isConnected ? "success" : "primary"}
              onClick={handleConnect}
              disabled={isConnecting || isConnected || !formData.supabaseKey}
              className="rounded-l-none"
            >
              {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Connect'}
            </Button>
          </div>
        </div>
        
        {isConnected && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium">Available Tables</h3>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto">
              {tables.map((table) => (
                <div key={table.name} className="mb-4">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => updateFormData({ selectedTable: table.name })}
                  >
                    <input
                      type="radio"
                      name="table"
                      checked={formData.selectedTable === table.name}
                      onChange={() => updateFormData({ selectedTable: table.name })}
                      className="mr-2"
                    />
                    <h4 className="text-sm font-medium">{table.name}</h4>
                  </div>
                  
                  {formData.selectedTable === table.name && (
                    <div className="mt-2 ml-6 grid grid-cols-2 gap-2">
                      {table.columns.map((column) => (
                        <div key={column} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`column-${column}`}
                            checked={formData.selectedColumns.includes(column)}
                            onChange={(e) => {
                              const newColumns = e.target.checked
                                ? [...formData.selectedColumns, column]
                                : formData.selectedColumns.filter(c => c !== column);
                              updateFormData({ selectedColumns: newColumns });
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={`column-${column}`} className="text-sm">{column}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
