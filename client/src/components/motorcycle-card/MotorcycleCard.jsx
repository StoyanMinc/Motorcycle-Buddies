export default function MotorcycleCard({ motorcycle }) {
    return (
        <div className="motorcycle-card">
            <img src={motorcycle.image} alt={motorcycle.model} className="motorcycle-image" />
            <div className="motorcycle-info">
                <h3 className="motorcycle-name">{motorcycle.model}</h3>
                <p>Year: {motorcycle.year}</p>
                <p>Owner: {motorcycle.owner}</p>
                <button className="view-details-btn">View Details</button>
            </div>
        </div>
    )
}