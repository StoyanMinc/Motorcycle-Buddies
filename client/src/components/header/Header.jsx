import { Link, useLocation, useParams } from "react-router-dom";
import { getUser } from "../../context/AuthContext";
import { useState } from "react";

export default function Header() {

    const [showNav, setShowNav] = useState(false);
    const location = useLocation().pathname.split('/').at(1);

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
                        <li><Link className={location === '' ? 'link-active' : ''} to={'/'} onClick={toggleNav}>Home</Link></li>
                        <li><Link className={location === 'motorcycles' ? 'link-active' : ''} to={'/motorcycles'} onClick={toggleNav}>Motorcycles</Link></li>
                        {user
                            ? <>
                                <li><Link className={location === 'post-motorcycle' ? 'link-active' : ''} to={'/post-motorcycle'} onClick={toggleNav}>Add Motorcycle</Link></li>
                                <li><Link className={location === 'profile' ? 'link-active' : ''} to={'/profile'} onClick={toggleNav}>My Profile</Link></li>
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
            <div className={`toggle-icon ${showNav ? 'toggle-active' : ''}` }onClick={toggleNav}>menu</div>
        </div>
    )
}