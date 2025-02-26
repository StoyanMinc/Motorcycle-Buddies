import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

import { useGetOneMotorcycle } from "../../hooks/useMotorcycle.js";
import { getUser } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { motorcyclesService } from "../../api/motorcycles-api.js";

export default function MotorcycleDetails() {

    const { motorcycleId } = useParams();
    const [isOwner, setIsOwner] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const motorcycle = useGetOneMotorcycle(motorcycleId);

    const imageUrl = `http://localhost:3000/${motorcycle.image}`;

    const { user } = getUser();

    useEffect(() => {
        if (motorcycle.likes && likes === 0) {
            setLikes(motorcycle.likes.length)
        }
        if (motorcycle.owner !== undefined && user !== null) {
            const isOwner = motorcycle.owner._id === user.userId;
            setIsOwner(isOwner);

            if (!isOwner) {
                const isLiked = motorcycle.likes.includes(user.userId);
                setIsLiked(isLiked);
            }
        }
    }, [motorcycle, user]);

    const sendLikeHandler = async () => {
        if (!user || !motorcycle._id) {
            return;
        }

        const queryParams = new URLSearchParams({
            userId: user.userId,
        }).toString();
        try {
            const updatedMotorcycle = await motorcyclesService.sendLike(motorcycle._id, queryParams);
            setLikes(updatedMotorcycle.likes.length);
            setIsLiked(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteMotorcycleHandler = async (motorcycleId) => {
        
    }
    return (
        <div className="details-container">
            <h1>Motorcycle details</h1>
            <div className="motorcycle-details-card">
                <img
                    src={imageUrl}
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
                    <p><strong>Likes:</strong> {likes}</p>
                    {user &&
                        <div className="options-buttons">
                            {isOwner
                                ? (<>
                                    <Link to={`/motorcycles/${motorcycle._id}/edit`} className="edit-btn">Edit</Link>
                                    <Link to={`/motorcycles/${motorcycle._id}/delete`} className="delete-btn">Delete</Link>
                                </>)
                                : (isLiked ? <span className="send-like-btn">Liked!</span> : <button className="send-like-btn" onClick={sendLikeHandler}>Like</button>)
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}