import InputError from '@/Components/InputError';
import Button from './Button';

export default function GeoBtn({ 
    hasLocation, 
    onOpenMap, 
    disabled,
    errors 
}) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Geolocation</h3>
            
            <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onOpenMap}
                disabled={disabled}
            >
                {hasLocation ? 'Update Location' : 'Locate your Address'}
            </Button>

            {hasLocation && (
                <p className="text-xs text-green-600 text-center font-medium">
                    ✓ Location set successfully
                </p>
            )}
            
            {!disabled && !hasLocation && (
                <p className="text-xs text-gray-500 text-center">
                    Please select municipality and barangay first
                </p>
            )}
            
            <InputError message={errors.latitude || errors.longitude} className="mt-2" />
        </div>
    );
}