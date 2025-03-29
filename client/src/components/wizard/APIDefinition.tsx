import { useState } from 'react';

export default function APIDefinition({ formData, updateFormData }) {
  const handleInputTypeChange = (type) => {
    updateFormData({ inputType: type });
  };
  
  const generateSampleQuery = () => {
    if (!formData.selectedTable || formData.selectedColumns.length === 0) {
      return 'SELECT * FROM table_name';
    }
    
    const columns = formData.selectedColumns.length > 0 
      ? formData.selectedColumns.join(', ') 
      : '*';
      
    return `SELECT ${columns} FROM ${formData.selectedTable}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">API Definition</h2>
      
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            formData.inputType === 'sql'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleInputTypeChange('sql')}
        >
          SQL Query
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            formData.inputType === 'type'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleInputTypeChange('type')}
        >
          Type-Based
        </button>
      </div>
      
      {formData.inputType === 'sql' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SQL Query
            </label>
            <div className="relative">
              <button 
                className="absolute right-2 top-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md dark:bg-blue-900 dark:text-blue-300"
                onClick={() => updateFormData({ sqlQuery: generateSampleQuery() })}
              >
                Generate
              </button>
              <textarea
                value={formData.sqlQuery}
                onChange={(e) => updateFormData({ sqlQuery: e.target.value })}
                placeholder="Write your SQL query here..."
                className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium mb-2">SQL Query Tips</h3>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-4">
              <li>Use parameterized queries for security (e.g., :user_id)</li>
              <li>Include ORDER BY for consistent results</li>
              <li>Limit results when possible for better performance</li>
              <li>Join tables efficiently to minimize data transfer</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.selectedTable ? (
            <div>
              <h3 className="text-sm font-medium mb-2">Configure Type-Based Response</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Response Format
                  </label>
                  <select
                    value={formData.responseFormat}
                    onChange={(e) => updateFormData({ responseFormat: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="json">JSON Object</option>
                    <option value="array">JSON Array</option>
                    <option value="single">Single Value</option>
                  </select>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium">Selected Fields</h3>
                  </div>
                  <div className="p-4">
                    {formData.selectedColumns.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {formData.selectedColumns.map((column) => (
                          <div key={column} className="text-sm py-1 px-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                            {column}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No columns selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Please select a table in the Database Connection step to configure type-based responses.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
