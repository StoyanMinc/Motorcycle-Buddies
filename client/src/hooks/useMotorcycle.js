import { useNavigate } from 'react-router-dom';
import { motorcyclesService } from "../api/motorcycles-api.js"
import { getUser } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';

export function useCreate() {
    const { user } = getUser();
    const navigate = useNavigate();
    const createHandler = async (values) => {
        values.user = user.username
        const result = await motorcyclesService.create(values);
        navigate('/');
    };
    return createHandler;
};

export function useGetAllMotorcycles() {
    const [motorcycles, setMotorcycles] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await motorcyclesService.getAll();
            setMotorcycles(result);

        })();
    }, [])

    return motorcycles;
};

export function useGetOneMotorcycle(motorcycleId) {
    const [motorcycle, setMotorcycle] = useState({});

    useEffect(() => {

        (async () => {
            const result = await motorcyclesService.getOne(motorcycleId);
            setMotorcycle(result);
        })();
    }, [motorcycleId]);

    return motorcycle;
};