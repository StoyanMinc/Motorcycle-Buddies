import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

export default function Logout() {

    const logoutHander = useLogout();
    logoutHander();

    return (
        <Navigate to="/" />
    );
}