import { useEffect, useState } from 'react';

import MotorcycleCard from '../motorcycle-card/MotorcycleCard';
import { useGetUserMotorcycles } from '../../hooks/useMotorcycle';
import ProfileCard from './ProfileCard';
import ProfileEdit from './ProfileEdit';
import ChangePassword from './ChangePassword';
import { useGetUser } from '../../hooks/useUser';
import { getUserFromServer } from '../../api/user-api';
import { getUser } from '../../context/AuthContext';

export default function Profile() {
    const { user } = getUser();
    const [currentTab, setCurrentTap] = useState('profile-info');

    const motorcycles = useGetUserMotorcycles();
    // const userData = useGetUser();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getUserFromServer(user.userId);
            setUserData(result);
        })();
    }, []);

    const imageUrl = `http://localhost:3000/${userData?.image}`;

    const changeTabHandler = (value) => setCurrentTap(value);

    const updateUserState = (updatedUser) => {
        setUserData((prevState) => ({
            ...prevState,
            ...updatedUser
        }))
    };

    

    return (
        <div className="page-container">

            <div className="profile-container">
                <div className="profile-side-panel">
                    <span onClick={() => changeTabHandler('profile-info')}>profile info</span>
                    <span onClick={() => changeTabHandler('your-motorcycles')}>your motorcycles</span>
                    <span onClick={() => changeTabHandler('edit-profile')}>edit profile</span>
                    <span onClick={() => changeTabHandler('change-password')}>change password</span>
                </div>

                {currentTab === 'profile-info' && userData !== null && <ProfileCard user={userData} imageUrl={imageUrl} />}
                {currentTab === 'edit-profile' &&
                    <ProfileEdit
                        user={userData}
                        imageUrl={imageUrl}
                        changeTab={changeTabHandler}
                        updateUser={updateUserState}
                    />
                }

                {currentTab === 'your-motorcycles' &&
                    <div className="cards-wrapper">
                        {motorcycles.map(motorcycle => <MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}
                    </div>
                }
                {currentTab === 'change-password' && <ChangePassword changeTab={changeTabHandler} />}
            </div>
        </div>
    )
}