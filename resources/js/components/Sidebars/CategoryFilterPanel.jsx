// Content for Left

export default function CategoryFilterPanel({
    categories,
    selectedCategory,
    onCategoryClick,
    totalCrops,
    isAdmin,
    onAddCrop
}) {
    return (
        <div className="space-y-2">
            <button
                onClick={() => onCategoryClick('')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === '' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                <div className="flex justify-between items-center">
                    <span className="font-medium">All Crops</span>
                    <span className="text-sm">{totalCrops}</span>
                </div>
            </button>

            {categories.map(category => (
                <div key={category.id}>
                    <button
                        onClick={() => onCategoryClick(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            selectedCategory == category.id 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-sm">{category.crops_count}</span>
                        </div>
                    </button>
                    
                    {isAdmin && selectedCategory == category.id && (
                        <button
                            onClick={() => onAddCrop(category.id)}
                            className="w-full mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                        >
                            + Add Crop
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}