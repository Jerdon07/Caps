
export function StatCard({
    name,
    price,
    percentChange,
}) {
    const isUp = percentChange > 0
    const color = isUp ? "text-green-600" : "text-red-600"

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground">{name}</p>
                <p className="text-lg font-semibold">₱{price.toFixed(2)}</p>
            </div>

            <div className={`text-sm font-medium ${color}`}>
                {isUp ? "▲" : "▼"} {Math.abs(percentChange).toFixed(2)}%
            </div>
        </div>
    )
}