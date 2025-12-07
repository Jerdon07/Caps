import CropCard from './CropCard';

export default function CropGrid({ crops, isAdmin, onEdit, onDelete }) {
    if (crops.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">No crops found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map(crop => (
                <CropCard
                    key={crop.id}
                    crop={crop}
                    isAdmin={isAdmin}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}