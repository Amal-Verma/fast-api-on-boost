'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import GeneralSettings from './GeneralSettings';
import DatabaseConnection from './DatabaseConnection';
import APIDefinition from './APIDefinition';
import ResponsePreview from './ResponsePreview';

const steps = [
  { id: 1, name: 'General Settings' },
  { id: 2, name: 'Database Connection' },
  { id: 3, name: 'API Definition' },
  { id: 4, name: 'Response Preview' },
];

export default function APICreationWizard({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    method: 'GET',
    supabaseKey: '',
    inputType: 'sql',
    sqlQuery: '',
    selectedTable: '',
    selectedColumns: [],
    responseFormat: 'json',
  });

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Save/deploy API logic would go here
    console.log('Saving API with data:', formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GeneralSettings formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <DatabaseConnection formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <APIDefinition formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ResponsePreview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step) => (
              <li key={step.id} className={`relative flex-1 ${step.id !== steps.length ? 'pr-8' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      step.id < currentStep
                        ? 'bg-blue-600'
                        : step.id === currentStep
                        ? 'border-2 border-blue-600 bg-white dark:bg-gray-700'
                        : 'border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-medium ${step.id === currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {step.id}
                      </span>
                    )}
                  </div>
                  {step.id !== steps.length && (
                    <div className={`absolute top-4 right-0 h-0.5 w-full ${step.id < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  )}
                </div>
                <span className="mt-2 block text-xs font-medium text-center">{step.name}</span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mb-8">
        {renderStepContent()}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={currentStep === 1 ? onClose : handlePrevious}
        >
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </Button>
        
        <Button 
          variant="primary" 
          onClick={currentStep === steps.length ? handleSave : handleNext}
        >
          {currentStep === steps.length ? 'Save & Deploy API' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
