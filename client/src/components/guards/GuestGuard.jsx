import { Navigate } from "react-router-dom";
import { getUser } from "../../context/AuthContext";

export default function GuestGuard() {
    const { user } = getUser();

    return (
        user
            ? <Navigate to={'/'} />
            : <Outlet />
    )
}