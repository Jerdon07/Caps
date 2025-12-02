import BaseModal from './BaseModal';

export default function FarmerDetailModal({ isOpen, onClose, farmer }) {
    if (!farmer) return null;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Farmer Details"
        >
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-800 font-medium">{farmer.user.name}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-800">{farmer.phone_number}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-800">
                        {farmer.sitio.name}, {farmer.barangay.name}, {farmer.municipality.name}
                    </p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Crops</label>
                    <div className="flex flex-wrap gap-2">
                        {farmer.crops.map(crop => (
                            <span 
                                key={crop.id} 
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                                {crop.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={onClose}
                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
                Close
            </button>
        </BaseModal>
    );
}