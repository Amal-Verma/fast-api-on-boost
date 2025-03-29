'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/layout/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import APIRoutesTable from '../components/dashboard/APIRoutesTable';
import APICreationWizard from '../components/wizard/APICreationWizard';
import { Button } from '../components/ui/Button';

export default function Dashboard() {
  const { theme } = useTheme();
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <DashboardHeader />
        
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">API Routes</h1>
          <Button 
            onClick={() => setShowCreateWizard(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
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
