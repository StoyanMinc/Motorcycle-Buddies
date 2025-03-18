import { useParams, useNavigate, Link } from "react-router-dom"

import { useGetOneMotorcycle } from "../../hooks/useMotorcycle.js";
import { getUser } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { motorcyclesService } from "../../api/motorcycles-api.js";
import DeleteConfirmModal from "../modals/DeleteConfirmModal.jsx";

export default function MotorcycleDetails() {

    const navigate = useNavigate();

    const { motorcycleId } = useParams();
    const [isOwner, setIsOwner] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    const motorcycle = useGetOneMotorcycle(motorcycleId);

    const imageUrl = `https://motorcycle-buddies.live:3000/${motorcycle.image}`;

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

    const editButtonHandler = (motorcycleId) => navigate(`/motorcycles/${motorcycleId}/edit`);

    const deleteMotorcycleHandler = async () => {
        await motorcyclesService.deleteMotorcycle(motorcycleId);
        setShowDeleteConfirmModal(false)
        navigate('/');
    }

    const showModalHandler = (option) => {
        setShowDeleteConfirmModal(option);
    }

    return (
        <>
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
                        <p>Owner: <Link className="owner-link" to={`/user/${motorcycle.owner?._id}`}>{motorcycle.owner?.username}</Link></p>
                        <p>Year:<strong>{motorcycle.year}</strong> </p>
                        <p>Buy Year: <strong>{motorcycle.buyYear}</strong> </p>
                        <p>Sold Year: <strong>{motorcycle.soldYear || 'Still Owned'}</strong></p>
                        <p className="motorcycle-description">{motorcycle.description}</p>
                        <p>Likes: <strong>{likes}</strong></p>
                        {user &&
                            <div className="options-buttons">
                                {isOwner
                                    ? (<>
                                        <button onClick={() => editButtonHandler(motorcycle._id)} className="edit-btn">Edit</button>
                                        <button className="delete-btn" onClick={() => showModalHandler(true)}>Delete</button>
                                    </>)
                                    : (isLiked ? <span className="send-like-btn">Liked!</span> : <button className="send-like-btn" onClick={sendLikeHandler}>Like</button>)
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            {showDeleteConfirmModal && <DeleteConfirmModal deleteHandler={deleteMotorcycleHandler} hideModalHanlder={setShowDeleteConfirmModal} />}
        </>

    )
}