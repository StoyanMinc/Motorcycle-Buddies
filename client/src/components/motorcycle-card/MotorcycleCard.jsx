import { Link } from "react-router-dom";

export default function MotorcycleCard({ motorcycle }) {
    return (
        <div className="motorcycle-card">
            <img src={motorcycle.imageUrl} alt={motorcycle.model} className="motorcycle-image" />
            <div className="motorcycle-info">
                <h3 className="motorcycle-name">{motorcycle.model}</h3>
                <p>Year: {motorcycle.year}</p>
                <p>Owner: {motorcycle.owner.username}</p>
                <Link to={`/motorcycles/${motorcycle._id}`} className="view-details-btn">View Details</Link>
            </div>
        </div>
    )
}