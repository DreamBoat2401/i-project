export default function RecommendationPage({ recommendation }) {
  if (!recommendation || recommendation.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <h2 className="text-3xl font-extrabold text-red-800 mb-6 text-center">
        🌟 Recommended Foods 🌟
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(recommendation).map(([category, food], idx) => (
          <div
            key={idx}
            className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-red-700 mb-3 text-center">
              {category}
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {food.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="hover:text-red-600 transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
