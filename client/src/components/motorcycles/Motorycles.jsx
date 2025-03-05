import { useState } from "react";
import { useGetAllMotorcycles } from "../../hooks/useMotorcycle.js"
import MotorcycleCard from "../motorcycle-card/MotorcycleCard.jsx";

export default function Motorcycles() {
    const motorcycles = useGetAllMotorcycles();
    const [searchingParams, setSearchingParams] = useState({ model: '', owner: '' });
    const [searchedResult, setSearchedResult] = useState(null);

    const searchingChangeHandler = (e) => {
        const { id, value } = e.target;
        setSearchingParams((prev) => ({
            ...prev,
            [id]: value
        }))
    };

    const searchHandler = async () => {
        const { model, owner } = searchingParams;
        const searchedMotorcycles = motorcycles.filter(motorcycle => {
            return (
                (model === '' || motorcycle.model.toLowerCase().includes(model.toLowerCase())) &&
                (owner === '' || motorcycle.owner.username.toLowerCase() === owner.toLocaleLowerCase()) 
            );
        });
        return setSearchedResult(searchedMotorcycles)
    }

    const motorcyclesToDisplay = searchedResult !== null ? searchedResult : motorcycles;

    return (
        <div className="page-container">
            <h1>Motorcycles</h1>
            <div className="search-bar-container">
                <input type="text" className="search-input" id="model" placeholder="Search by model..." value={searchingParams.model} onChange={searchingChangeHandler} />
                <input type="text" className="search-input" id="owner" placeholder="Search by owner..." value={searchingParams.owner} onChange={searchingChangeHandler} />
                <button className="search-button" onClick={searchHandler}>Search</button>
            </div>
            <div className="cards-wrapper">
                {motorcyclesToDisplay.map(motorcycle => <MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}
            </div>
        </div>
    );
};