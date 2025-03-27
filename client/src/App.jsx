import { Route, Routes } from "react-router-dom"

import { UserProvider } from "./context/AuthContext"

import Header from "./components/header/Header"

import AuthGuard from "./components/guards/AuthGuard"
import GuestGuard from "./components/guards/GuestGuard"

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
import UserCard from "./components/users/UserCard"

function App() {

    return (
        <UserProvider>

            <div className="site-container">
                <Header />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/motorcycles" element={<Motorcycles />} />
                        <Route path="/motorcycles/:motorcycleId" element={<MotorcycleDetails />} />
                        <Route element={<AuthGuard />}>
                            <Route path="/post-motorcycle" element={<AddMotorcycle />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/motorcycles/:motorcycleId/edit" element={<EditMotorcycle />} />
                            <Route path="/user/:userId" element={<UserCard />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Route>
                    </Routes>
                </main>

                <Footer />
            </div>
        </UserProvider>
    )
}

export default App
