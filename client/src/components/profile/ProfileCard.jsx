import { Link } from "react-router-dom";

export default function ProfileCard({ user }) {
    return (
        <div className="profile-info-container">
            <div className="profile-header-container">
                <div className="profile-picture-container">
                    <span>Profile Picture</span>
                    <img src={user.image !== undefined ? `http://192.168.1.75:3000/${user.image}` : 'images/profile-avatar.avif'} alt={user.username} />
                </div>
            </div>

            <div className="profile-details-container">
                <div className="profile-detail">
                    <span>Username: </span>
                    <strong>{user.username}</strong>
                </div>
                <div className="profile-detail">
                    <span>Email: </span>
                    <strong>{user.email}</strong>
                </div>
                <div className="profile-detail">
                    <span>Facebook: </span>
                    <strong><Link to={user.facebook} target="_blank" rel="noopener noreferrer" className="facebook-link">View Profile</Link></strong>
                </div>
                <div className="profile-detail">
                    <span>Date of Birth: </span>
                    <strong>{user.dateOfBirth}</strong>
                </div>
                <div className="profile-detail">
                    <span>Phone Number: </span>
                    <strong>{user.phoneNumber}</strong>
                </div>
            </div>
        </div>
    )
}