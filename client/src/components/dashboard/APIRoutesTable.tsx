'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

// Sample API route data
const sampleRoutes = [
  { id: 1, name: 'Get Users', method: 'GET', inputType: 'SQL Query', status: 'Active' },
  { id: 2, name: 'Create User', method: 'POST', inputType: 'Type-Based', status: 'Active' },
  { id: 3, name: 'Update User', method: 'PUT', inputType: 'SQL Query', status: 'Draft' },
  { id: 4, name: 'Delete User', method: 'DELETE', inputType: 'Type-Based', status: 'Active' },
  { id: 5, name: 'Get Products', method: 'GET', inputType: 'SQL Query', status: 'Draft' },
];

export default function APIRoutesTable() {
  const [routes, setRoutes] = useState(sampleRoutes);

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleDeleteRoute = (id) => {
    if (window.confirm('Are you sure you want to delete this API route?')) {
      setRoutes(routes.filter(route => route.id !== id));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Endpoint Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              HTTP Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Input Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {routes.map((route) => (
            <tr key={route.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {route.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(route.method)}`}>
                  {route.method}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {route.inputType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  route.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {route.status === 'Active' ? (
                    <><FiCheck className="inline mr-1" size={12} /> {route.status}</>
                  ) : (
                    <><FiX className="inline mr-1" size={12} /> {route.status}</>
                  )}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <FiEdit size={18} />
                </button>
                <button 
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => handleDeleteRoute(route.id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
