import { StatCard } from "./stat-card"

export function Movers({ marketMovers }) {
    return (
        <>
            <h3>Market Movers</h3>

            <div className="container">
                {marketMovers.map(crop => (
                    <StatCard
                        key={crop.crop_id}
                        name={crop.crop_name}
                        price={crop.current_price}
                        percentChange={crop.percent_change}
                    />
                ))}
            </div>
        </>
    )
}