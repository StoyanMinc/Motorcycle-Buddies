import { getLastMotorcycles } from "../../hooks/useMotorcycle"
import MotorcycleCard from "../motorcycle-card/MotorcycleCard"

export default function Home() {

    const lastMotorcycles = getLastMotorcycles();
    console.log(lastMotorcycles);
    return (
        <div className="page-container">
            <h1>Welcome to Our Motorcycle Journey!</h1>
            <p>This is the place where we celebrate our passion for motorcycles!</p>
            <p>Our collection features the bikes we've owned, ridden, and loved over the years. From the classic models to the more recent ones, each motorcycle has its own story. Join us as we share memories, adventures, and the joy of two wheels!
                Browse through our collection, get inspired, and feel the thrill of the ride!</p>

            <h2>The last added motorcycles:</h2>

            <div className="home-cards-wrapper">
               
                {lastMotorcycles.map(motorcycle => < MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}

            </div>
        </div>
    )
}

