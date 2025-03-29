export default function GeneralSettings({ formData, updateFormData }) {
  const handleMethodChange = (e) => {
    updateFormData({ method: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">General Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            API Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="e.g., Get Users, Product List"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            HTTP Method
          </label>
          <select
            value={formData.method}
            onChange={handleMethodChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Method Description</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {formData.method === 'GET' && 'Use GET to retrieve data without modifying resources.'}
            {formData.method === 'POST' && 'Use POST to create new resources or submit data for processing.'}
            {formData.method === 'PUT' && 'Use PUT to update or replace existing resources.'}
            {formData.method === 'DELETE' && 'Use DELETE to remove resources.'}
            {formData.method === 'PATCH' && 'Use PATCH to apply partial updates to resources.'}
          </p>
        </div>
      </div>
    </div>
  );
}
