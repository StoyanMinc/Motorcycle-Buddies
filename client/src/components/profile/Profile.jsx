import { useEffect, useState } from 'react';

import MotorcycleCard from '../motorcycle-card/MotorcycleCard';
import { useGetUserMotorcycles } from '../../hooks/useMotorcycle';
import ProfileCard from './ProfileCard';
import ProfileEdit from './ProfileEdit';
import ChangePassword from './ChangePassword';
import { getUserFromServer } from '../../api/user-api';
import { getUser } from '../../context/AuthContext';

export default function Profile() {
    const { user } = getUser();

    const [currentTab, setCurrentTap] = useState('profile-info');
    const [userData, setUserData] = useState(null);

    const motorcycles = useGetUserMotorcycles();

    useEffect(() => {
        (async () => {
            const result = await getUserFromServer(user.userId);
            setUserData(result);
        })();
    }, []);

    const changeTabHandler = (value) => setCurrentTap(value);

    const updateUserState = (updatedUser) => {
        setUserData((prevState) => ({
            ...prevState,
            ...updatedUser
        }))
    };
    console.log(motorcycles);
    return (
        <div className="page-container">

            <div className="profile-container">
                <div className="profile-side-panel">
                    <span className={currentTab === 'profile-info' ? 'link-active' : ''} onClick={() => changeTabHandler('profile-info')}>profile info</span>
                    <span className={currentTab === 'your-motorcycles' ? 'link-active' : ''} onClick={() => changeTabHandler('your-motorcycles')}>my motorcycles</span>
                    <span className={currentTab === 'edit-profile' ? 'link-active' : ''} onClick={() => changeTabHandler('edit-profile')}>edit profile</span>
                    <span className={currentTab === 'change-password' ? 'link-active' : ''} onClick={() => changeTabHandler('change-password')}>change password</span>
                </div>

                {currentTab === 'profile-info' && userData !== null && <ProfileCard user={userData} />}
                {currentTab === 'edit-profile' &&
                    <ProfileEdit
                        user={userData}
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