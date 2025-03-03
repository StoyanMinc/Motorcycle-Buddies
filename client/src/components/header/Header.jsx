import { Link } from "react-router-dom";
import { getUser } from "../../context/AuthContext";
import { useState } from "react";

export default function Header() {

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(state => !state);
    }

    const { user } = getUser();
    return (
        <div className="header-container">
            <h1>This is our Passion!</h1>
            <div className={showNav ? 'nav-container nav-show' : 'nav-container'}>
                <nav>
                    <ul>
                        <li><Link to={'/'} onClick={toggleNav}>Home</Link></li>
                        <li><Link to={'/motorcycles'} onClick={toggleNav}>Motorcycles</Link></li>
                        {user
                            ? <>
                                <li><Link to={'/motorcycles/post'} onClick={toggleNav}>Add Motorcycle</Link></li>
                                <li><Link to={'/profile'} onClick={toggleNav}>Profile</Link></li>
                                <li><Link to={'/logout'} onClick={toggleNav}>Logout</Link></li>
                            </>
                            : <>
                                <li><Link to={'/login'} onClick={toggleNav}>Login</Link></li>
                                <li><Link to={'/register'} onClick={toggleNav}>Register</Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
            <div className="toggle-icon" onClick={toggleNav}>menu</div>
        </div>
    )
}