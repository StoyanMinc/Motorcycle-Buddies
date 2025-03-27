import { useNavigate } from 'react-router-dom';
import { motorcyclesService } from "../api/motorcycles-api.js"
import { getUser } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';

export function useCreateMotorcycle() {
    const { user } = getUser();
    const navigate = useNavigate();
    const createHandler = async (values) => {
        values.owner = user.userId
        const result = await motorcyclesService.create(values);
        navigate('/motorcycles');
    };
    return createHandler;
};

export function useGetAllMotorcycles(searchingParams) {
    const [motorcycles, setMotorcycles] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await motorcyclesService.getAll(searchingParams);
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

export function getLastMotorcycles() {
    const [lastMotorcycles, setLastMotorcycles] = useState([]);

    useEffect(() => {

        (async () => {
            const result = await motorcyclesService.getLast();
            setLastMotorcycles(result);
        })();
    }, []);

    return lastMotorcycles;
};

export function useEditMotorcycle() {
    const navigate = useNavigate();

    const editHandler = async (motorcycleId, values) => {
        await motorcyclesService.editMotorcycle(motorcycleId, values);
        navigate('/motorcycles');
    };
    return editHandler;
};

export function useGetUserMotorcycles() {
    const { user } = getUser();

    const [motorycles, setMotorcycles] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await motorcyclesService.getUserMotorcycles(user.userId);
            setMotorcycles(result);
        })();
    }, []);

    return motorycles;
}

export function useGetOwnerMotorcycles(ownerId) {

    const [motorcycles, setMotorcycles] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await motorcyclesService.getUserMotorcycles(ownerId);
            setMotorcycles(result);
        })();
    }, []);

    return motorcycles;
}