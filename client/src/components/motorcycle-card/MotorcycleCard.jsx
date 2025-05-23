import { Link } from "react-router-dom";

export default function MotorcycleCard({ motorcycle }) {
    
    const imageUrl = `https://motorcycle-buddies.live:3000/${motorcycle.image}`;
    return (
        <div className="motorcycle-card">
            <img src={imageUrl} alt={motorcycle.model} className="motorcycle-image" />
            <div className="motorcycle-info">
                <h3 className="motorcycle-name">{motorcycle.model}</h3>
                <p>Owner: <strong>{motorcycle.owner.username}</strong></p>
                <p>Year: <strong>{motorcycle.year}</strong></p>
                <Link to={`/motorcycles/${motorcycle._id}`} className="view-details-btn">View Details</Link>
            </div>
        </div>
    )
}