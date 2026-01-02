
export function MarketPulse ({ pulse }) {
    const allUpdated = pulse.changed + pulse.unchanged === pulse.total

    return (
        <>
            <h3 className="mb-2 font-semibold">Market Pulse</h3>

            <p className="text-sm">
                {pulse.changed} changed · {pulse.unchanged} unchanged
            </p>

            <p className="mt-3 text-lg font-semibold">
                {pulse.change_rate}% of prices moved
            </p>

            <p className={`mt-2 text-sm ${allUpdated ? "text-green-600" : "text-yellow-600"}`}>
                {allUpdated ? "✔ All crops updated this week" : "⚠ Some data missing"}
            </p>
        </>
    )
}