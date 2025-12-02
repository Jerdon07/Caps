// Content for Right

import { router, usePage } from '@inertiajs/react';

export default function AdminPendingPanel() {
    const { pendingFarmers } = usePage().props;

    const handleApprove = (userId) => {
        if (confirm('Approve this farmer account?')) {
            router.post(route('admin.farmers.approve', userId), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleReject = (userId) => {
        if (confirm('Reject and permanently delete this farmer account? This cannot be undone.')) {
            router.post(route('admin.farmers.reject', userId), {}, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Pending Accounts</h2>
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                    {pendingFarmers?.length || 0}
                </span>
            </div>

            {!pendingFarmers || pendingFarmers.length === 0 ? (
                <p className="text-gray-300 text-center py-8">No pending farmers</p>
            ) : (
                <div className="space-y-4">
                    {pendingFarmers.map(farmer => (
                        <div key={farmer.id} className="bg-gray-700 rounded-lg p-4">
                            <div className="font-semibold text-white mb-1">{farmer.user.name}</div>
                            <div className="text-sm text-gray-300 mb-1">{farmer.user.email}</div>
                            <div className="text-sm text-gray-400 mb-3">
                                {farmer.municipality.name}, {farmer.barangay.name}
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleApprove(farmer.user_id)}
                                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors font-medium"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(farmer.user_id)}
                                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors font-medium"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}