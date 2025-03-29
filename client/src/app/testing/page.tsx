'use client';

import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../../components/layout/Sidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import APITester from '../../components/testing/APITester';

export default function TestingPage() {
  const { theme } = useTheme();
  
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <DashboardHeader />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">API Testing</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Test your API endpoints and monitor request/response details.
          </p>
        </div>
        
        <APITester />
      </main>
    </div>
  );
}
