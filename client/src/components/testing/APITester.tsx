'use client';

import { useState } from 'react';
import { FiSend, FiSave, FiCopy, FiMoreVertical } from 'react-icons/fi';
import { Button } from '../ui/Button';

export default function APITester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [response, setResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('body');

  // Sample saved endpoints
  const savedEndpoints = [
    { id: 1, name: 'Get All Users', method: 'GET', url: '/api/users' },
    { id: 2, name: 'Create User', method: 'POST', url: '/api/users' },
    { id: 3, name: 'Update User', method: 'PUT', url: '/api/users/1' },
  ];

  const handleEndpointSelect = (endpoint) => {
    setSelectedEndpoint(endpoint.id);
    setMethod(endpoint.method);
    setUrl(endpoint.url);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleRemoveHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleSendRequest = () => {
    setIsLoading(true);
    const startTime = Date.now();
    
    // Simulate API call
    setTimeout(() => {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      
      // Mock response based on method and URL
      let mockResponse;
      if (method === 'GET') {
        mockResponse = {
          status: 200,
          statusText: 'OK',
          data: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          ]
        };
      } else if (method === 'POST') {
        mockResponse = {
          status: 201,
          statusText: 'Created',
          data: { 
            id: 3, 
            ...JSON.parse(requestBody || '{}'),
            createdAt: new Date().toISOString()
          }
        };
      } else if (method === 'PUT') {
        mockResponse = {
          status: 200,
          statusText: 'OK',
          data: { 
            id: parseInt(url.split('/').pop()), 
            ...JSON.parse(requestBody || '{}'),
            updatedAt: new Date().toISOString()
          }
        };
      } else if (method === 'DELETE') {
        mockResponse = {
          status: 204,
          statusText: 'No Content',
          data: null
        };
      }
      
      setResponse(mockResponse);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-4 h-[calc(100vh-180px)]">
        {/* Saved Endpoints Sidebar */}
        <div className="col-span-1 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium">Saved Endpoints</h2>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {savedEndpoints.map((endpoint) => (
              <li 
                key={endpoint.id}
                className={`cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedEndpoint === endpoint.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                }`}
                onClick={() => handleEndpointSelect(endpoint)}
              >
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="text-sm font-medium">{endpoint.name}</span>
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                  {endpoint.url}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Request Builder */}
        <div className="col-span-3 flex flex-col">
          {/* URL and method bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter request URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              
              <Button 
                onClick={handleSendRequest}
                disabled={isLoading || !url}
                className="flex items-center space-x-1"
              >
                <FiSend />
                <span>Send</span>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-1">
                <FiSave />
                <span>Save</span>
              </Button>
            </div>
          </div>
          
          {/* Tabs for Request settings */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'body'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('body')}
              >
                Body
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'headers'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('headers')}
              >
                Headers
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'params'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('params')}
              >
                Params
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'body' && (
              <div className="h-full">
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder={method !== 'GET' ? "Enter request body (JSON)" : "Request body not applicable for GET requests"}
                  disabled={method === 'GET'}
                  className="w-full h-full p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            )}
            
            {activeTab === 'headers' && (
              <div className="space-y-3">
                {headers.map((header, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                      placeholder="Header name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button 
                      onClick={() => handleRemoveHeader(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={handleAddHeader}>
                  Add Header
                </Button>
              </div>
            )}
            
            {activeTab === 'params' && (
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400">
                  Query parameters will be automatically extracted from the URL.
                </p>
              </div>
            )}
          </div>
          
          {/* Response section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Response</h3>
              {response && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{responseTime}ms</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    response.status < 300 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    response.status < 400 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {response.status} {response.statusText}
                  </span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FiCopy size={16} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 font-mono text-sm h-40 overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : response ? (
                <pre>{JSON.stringify(response.data, null, 2)}</pre>
              ) : (
                <div className="text-gray-400 dark:text-gray-500 flex items-center justify-center h-full">
                  Send a request to see the response
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
