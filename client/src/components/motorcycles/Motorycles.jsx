import { useGetAllMotorcycles } from "../../hooks/useMotorcycle.js"
import MotorcycleCard from "../motorcycle-card/MotorcycleCard.jsx";

export default function Motorcycles() {

    const motorcycles = useGetAllMotorcycles();

    return (
        <div className="page-container">
            <h1>Motorcycles</h1>
            <div className="cards-wrapper">
                {motorcycles.map(motorcycle => <MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}
            </div>
        </div>
    )
}