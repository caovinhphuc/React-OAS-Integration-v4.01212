/**
 * =============================================================================
 * 🧪 Tailwind Test Component
 * =============================================================================
 * Test component to verify Tailwind CSS v4 is working correctly
 * =============================================================================
 */

const TailwindTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎨 Tailwind CSS v4 Initialized!</h1>
          <p className="text-gray-600 text-lg">
            Tailwind CSS is now ready to use in your React OAS Integration project.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-500 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast</h3>
            <p className="text-gray-600">Utility-first CSS framework for rapid development</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-green-500 text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsive</h3>
            <p className="text-gray-600">Mobile-first breakpoints for all screen sizes</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-purple-500 text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable</h3>
            <p className="text-gray-600">
              Fully customizable design system with theme configuration
            </p>
          </div>
        </div>

        {/* Button Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Button Examples</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
              Secondary Button
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
              Success Button
            </button>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
              Danger Button
            </button>
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-full h-20 bg-blue-500 rounded-lg mb-2"></div>
              <p className="text-sm text-gray-600">Blue</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-green-500 rounded-lg mb-2"></div>
              <p className="text-sm text-gray-600">Green</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-red-500 rounded-lg mb-2"></div>
              <p className="text-sm text-gray-600">Red</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-yellow-500 rounded-lg mb-2"></div>
              <p className="text-sm text-gray-600">Yellow</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-purple-500 rounded-lg mb-2"></div>
              <p className="text-sm text-gray-600">Purple</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-pink-500 rounded-lg mb-2"></div>
              <p className="text-sm text-gray-600">Pink</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
