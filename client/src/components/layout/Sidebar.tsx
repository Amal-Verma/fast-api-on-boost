'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiLayers, FiSettings, FiPlay, FiHome, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome size={20} /> },
    { name: 'API Routes', path: '/api-routes', icon: <FiLayers size={20} /> },
    { name: 'Testing', path: '/testing', icon: <FiPlay size={20} /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings size={20} /> },
  ];

  return (
    <div 
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 h-screen ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } border-r shadow-sm flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h1 className="text-xl font-bold">API Builder</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </button>
      </div>

      <nav className="flex-1 pt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link href={item.path}>
                <div
                  className={`flex items-center p-3 rounded-md ${
                    pathname === item.path
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={toggleTheme}
          className={`${
            collapsed ? 'justify-center' : 'justify-between'
          } w-full flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          {!collapsed && <span>Toggle Theme</span>}
          <span className="text-yellow-500 dark:text-blue-400">
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
        </button>
      </div>
    </div>
  );
}
