import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export default function ResponsePreview({ formData }) {
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate SQL query based on form data
  useEffect(() => {
    if (formData.inputType === 'sql') {
      setGeneratedQuery(formData.sqlQuery);
    } else {
      if (formData.selectedTable && formData.selectedColumns.length > 0) {
        const columnsString = formData.selectedColumns.join(', ');
        setGeneratedQuery(`SELECT ${columnsString} FROM ${formData.selectedTable}`);
      } else {
        setGeneratedQuery('');
      }
    }
  }, [formData]);

  // Generate mock response
  useEffect(() => {
    if (generatedQuery) {
      generateMockResponse();
    }
  }, [generatedQuery]);

  const generateMockResponse = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let mockData;
      
      if (formData.inputType === 'sql' || formData.responseFormat === 'array') {
        // Generate array response
        mockData = Array(3).fill(null).map((_, index) => {
          const obj = {};
          formData.selectedColumns.forEach(column => {
            obj[column] = getMockValueForColumn(column, index);
          });
          return obj;
        });
      } else if (formData.responseFormat === 'json') {
        // Generate object response
        mockData = {};
        formData.selectedColumns.forEach(column => {
          mockData[column] = getMockValueForColumn(column, 0);
        });
      } else {
        // Generate single value
        mockData = formData.selectedColumns.length > 0 
          ? getMockValueForColumn(formData.selectedColumns[0], 0)
          : "sample value";
      }
      
      setJsonResponse(JSON.stringify(mockData, null, 2));
      setIsLoading(false);
    }, 800);
  };

  // Helper to generate appropriate mock values based on column name
  const getMockValueForColumn = (column, index) => {
    if (column.includes('id')) return index + 1;
    if (column.includes('name')) return ['John Doe', 'Jane Smith', 'Alice Johnson'][index % 3];
    if (column.includes('email')) return [`user${index}@example.com`];
    if (column.includes('price')) return (19.99 + index * 10).toFixed(2);
    if (column.includes('created_at')) return new Date().toISOString();
    if (column.includes('status')) return ['active', 'pending', 'completed'][index % 3];
    if (column.includes('total')) return ((index + 1) * 100).toFixed(2);
    return `Value for ${column} ${index + 1}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Response Preview</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Generated SQL Query
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 font-mono text-sm overflow-auto">
            {generatedQuery || 'No query generated yet.'}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Example JSON Response
            </h3>
            <Button 
              size="sm" 
              onClick={generateMockResponse}
              disabled={isLoading || !generatedQuery}
            >
              Regenerate
            </Button>
          </div>
          
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 z-10">
                <div className="loader">Loading...</div>
              </div>
            )}
            <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 font-mono text-sm overflow-auto h-64">
              {jsonResponse || "Response will appear here after query generation."}
            </pre>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Ready to Deploy</h3>
          <p className="text-sm text-green-700 dark:text-green-400">
            Your API endpoint is ready to be deployed. After saving, your API will be accessible at:<br />
            <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
              {`/api/${formData.name ? formData.name.toLowerCase().replace(/\s+/g, '-') : 'your-api-name'}`}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
