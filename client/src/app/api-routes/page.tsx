'use client';

import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../../components/layout/Sidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import APIRoutesTable from '../../components/dashboard/APIRoutesTable';
import APICreationWizard from '../../components/wizard/APICreationWizard';
import { Button } from '../../components/ui/Button';
import { FiPlus, FiFilter } from 'react-icons/fi';

export default function APIRoutesPage() {
  const { theme } = useTheme();
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <DashboardHeader />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">API Routes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage and monitor all your API endpoints.
          </p>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-md shadow-sm p-1">
              <button 
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === 'all' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''
                }`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''
                }`}
                onClick={() => setFilterStatus('active')}
              >
                Active
              </button>
              <button 
                className={`px-3 py-1 rounded-md text-sm ${
                  filterStatus === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''
                }`}
                onClick={() => setFilterStatus('draft')}
              >
                Draft
              </button>
            </div>
            
            <button className="flex items-center px-3 py-1.5 text-sm bg-white dark:bg-gray-800 rounded-md shadow-sm">
              <FiFilter className="mr-2" size={16} />
              More Filters
            </button>
          </div>
          
          <Button 
            onClick={() => setShowCreateWizard(true)}
            className="flex items-center"
          >
            <FiPlus className="mr-2" size={18} />
            Create New API Route
          </Button>
        </div>
        
        <APIRoutesTable />
        
        {showCreateWizard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-3/4 h-3/4 overflow-auto">
              <APICreationWizard onClose={() => setShowCreateWizard(false)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
