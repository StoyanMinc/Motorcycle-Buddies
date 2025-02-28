import { Link } from "react-router-dom";
import { getUser } from "../../context/AuthContext";

export default function Header() {

    const { user } = getUser();
    return (
        <div className="header-container">
            <h1>This is our Passion!</h1>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/motorcycles'} >Motorcycles</Link></li>
                        {user
                            ? <>
                                <li><Link to={'/motorcycles/post'} >Add Motorcycle</Link></li>
                                <li><Link to={'/profile'} >Profile</Link></li>
                                <li><Link to={'/logout'} >Logout</Link></li>
                            </>
                            : <>
                                <li><Link to={'/login'} >Login</Link></li>
                                <li><Link to={'/register'} >Register</Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}