import { useParams } from "react-router-dom";
import { useGetOwner, useGetUser } from "../../hooks/useUser"
import { useGetOwnerMotorcycles } from "../../hooks/useMotorcycle";
import ProfileCard from "../profile/ProfileCard";
import MotorcycleCard from "../motorcycle-card/MotorcycleCard";

export default function UserCard() {
    const { userId } = useParams();
    const user = useGetOwner(userId);
    const userMotorcycles = useGetOwnerMotorcycles(userId);
    return (
        <div className="page-container">
            <ProfileCard user={user} />
            <div className="cards-wrapper">
               {userMotorcycles.map(motorcycle => <MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}
            </div>
        </div>
    )
}