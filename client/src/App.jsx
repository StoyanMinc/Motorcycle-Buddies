import { Route, Routes } from "react-router-dom"

import { UserProvider } from "./context/AuthContext"
import Header from "./components/header/Header"

import Home from "./components/home/Home"
import Motorcycles from "./components/motorcycles/Motorycles"
import AddMotorcycle from "./components/addMotorcycle/AddMotorycle"
import Profile from "./components/profile/Profile"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import MotorcycleDetails from "./components/motorcycle-details/MotorcycleDetails"
import EditMotorcycle from "./components/edit-motorcycle/EditMotorcycle"
import Footer from "./components/footer/Footer"

function App() {

    return (
        <UserProvider>

            <div className="site-container">
                <Header />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/motorcycles" element={<Motorcycles />} />
                        <Route path="/motorcycles/post" element={<AddMotorcycle />} />
                        <Route path="/motorcycles/:motorcycleId/edit" element={<EditMotorcycle />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/motorcycles/:motorcycleId" element={<MotorcycleDetails />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </UserProvider>
    )
}

export default App
