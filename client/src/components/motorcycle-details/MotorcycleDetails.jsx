import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useGetOneMotorcycle } from "../../hooks/useMotorcycle.js";
import { getUser } from "../../context/AuthContext.jsx";

export default function MotorcycleDetails() {

    const { motorcycleId } = useParams();
    const motorcycle = useGetOneMotorcycle(motorcycleId);
    const { user } = getUser();
    // if (user && motorcycle) {
    //     const isOwner = motorcycle.owner._id === user.userId;
    // }
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
                        <Link to={`/motorcycles/${motorcycle._id}`} className="edit-btn">Edit</Link>
                        <Link to={`/motorcycles/${motorcycle._id}`} className="delete-btn">Delete</Link>
                        <Link to={`/motorcycles/${motorcycle._id}`} className="send-like-btn">Like</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}