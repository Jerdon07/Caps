
export function VolatilityAlert({ alert }) {
    return (
        <>
            <h3 className="mb-2 font-semibold text-red-700">
                High Volatility Alert
            </h3>

            <p className="text-sm text-muted-foreground">
                {alert.crop_name} ({alert.category_name})
            </p>

            <p className="mt-4 text-3xl font-bold text-red-600">
                ₱{alert.gap?.toFixed(2)}
            </p>

            <p className="text-xs text-muted-foreground">
                Min ₱{alert.price_min} → Max ₱{alert.price_max}
            </p>
        </>
    )
}