import { useEffect, useState } from "react";
// import { useGetAllMotorcycles } from "../../hooks/useMotorcycle.js"
import MotorcycleCard from "../motorcycle-card/MotorcycleCard.jsx";
import { motorcyclesService } from "../../api/motorcycles-api.js";

export default function Motorcycles() {
    const [searchingParams, setSearchingParams] = useState({ model: '', year: '' });
    const [queryParams, setQueryParams] = useState('');
    const [motorcycles, setMotorcycles] = useState([]);
    const searchingChangeHandler = (e) => {
        const { id, value } = e.target;
        setSearchingParams((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    useEffect(() => {

        if (searchingParams.model !== '' || searchingParams.year !== '') {
            const queryParams = new URLSearchParams({
                model: searchingParams.model,
                year: searchingParams.year
            });
            setQueryParams(queryParams.toString());
        }

    }, [searchingParams.model, searchingParams.year]);


    useEffect(() => {
        (async () => {
            const result = await motorcyclesService.getAll();
            setMotorcycles(result);
        })()
    }, []);

    const searchHandler = async () => {
        const result = await motorcyclesService.getSearched(queryParams);
        setMotorcycles(result);
    }

    return (
        <div className="page-container">
            <h1>Motorcycles</h1>
            <div className="search-bar-container">
                <input type="text" className="search-input" id="model" placeholder="Search by model..." value={searchingParams.model} onChange={searchingChangeHandler} />
                <input type="number" className="search-input" id="year" placeholder="Search by year..." value={searchingParams.year} onChange={searchingChangeHandler} />
                <button className="search-button" onClick={searchHandler}>Search</button>
            </div>
            <div className="cards-wrapper">
                {motorcycles.map(motorcycle => <MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}
            </div>
        </div>
    )
}