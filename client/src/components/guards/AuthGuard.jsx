import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../context/AuthContext";

export default function AuthGuard() {
    const { user } = getUser();

    console.log(user);
    return (
        user
            ? <Outlet />
            : <Navigate to={'/login'} />
    )
}

