import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useGetOneMotorcycle } from "../../hooks/useMotorcycle.js";

export default function MotorcycleDetails() {

    const { motorcycleId } = useParams();
    const motorcycle = useGetOneMotorcycle(motorcycleId);
    console.log(motorcycle);
    return (
        <div className="details-container">
            <h1>Motorcycle details</h1>
            <div className="motorcycle-details-card">
                <img
                    src={motorcycle.imageUrl}
                    alt={motorcycle.model}
                    className="motorcycle-image-details"
                />
                <div className="motorcycle-info">
                    <h2 className="motorcycle-model">{motorcycle.model}</h2>
                    <p><strong>Year:</strong> {motorcycle.year}</p>
                    <p><strong>Buy Year:</strong> {motorcycle.buyYear}</p>
                    <p><strong>Sold Year:</strong> {motorcycle.soldYear || 'Still Owned'}</p>
                    <p><strong>Owner:</strong> {motorcycle.owner?.username}</p>
                    <p className="motorcycle-description">{motorcycle.description}</p>
                    <p><strong>Likes:</strong> {motorcycle.likes?.length || 0}</p>
                    <div className="options-buttons">
                        <Link to={`/motorcycles/${motorcycle._id}`} className="view-details-btn">View Full Details</Link>
                        <Link to={`/motorcycles/${motorcycle._id}`} className="edit-btn">Edit</Link>
                        <Link to={`/motorcycles/${motorcycle._id}`} className="delete-btn">Delete</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}