// Content for Left

export default function AddressFilterPanel({
    municipalities,
    barangays,
    sitios,
    selectedMunicipality,
    selectedBarangay,
    selectedSitio,
    onMunicipalityChange,
    onBarangayChange,
    onSitioChange,
    onClearFilters
}) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Municipality
                </label>
                <select
                    value={selectedMunicipality}
                    onChange={(e) => onMunicipalityChange(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                    <option value="">All Municipalities</option>
                    {municipalities.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barangay
                </label>
                <select
                    value={selectedBarangay}
                    onChange={(e) => onBarangayChange(e.target.value)}
                    disabled={!selectedMunicipality || barangays.length === 0}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-100"
                >
                    <option value="">All Barangays</option>
                    {barangays.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sitio
                </label>
                <select
                    value={selectedSitio}
                    onChange={(e) => onSitioChange(e.target.value)}
                    disabled={!selectedBarangay || sitios.length === 0}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-100"
                >
                    <option value="">All Sitios</option>
                    {sitios.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </div>

            {(selectedMunicipality || selectedBarangay || selectedSitio) && (
                <button
                    onClick={onClearFilters}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}