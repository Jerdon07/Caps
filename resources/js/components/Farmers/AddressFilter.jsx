export default function AddressFilter({
    municipalities,
    barangays,
    selectedMunicipality,
    selectedBarangay,
    onMunicipalityChange,
    onBarangayChange,
}) {
    return (
        <div className="space-y-6 md:space-y-8">
            <h2 className="hidden md:block text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Address</h2>
            
            <div>
                <select
                    value={selectedMunicipality}
                    onChange={(e) => onMunicipalityChange(e.target.value)}
                    className="w-full text-sm md:text-base border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                >
                    <option value="">Municipalities</option>
                    {municipalities.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <select
                    value={selectedBarangay}
                    onChange={(e) => onBarangayChange(e.target.value)}
                    disabled={!selectedMunicipality || barangays.length === 0}
                    className="w-full text-sm md:text-base border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black disabled:bg-gray-100"
                >
                    <option value="">Barangays</option>
                    {barangays.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}