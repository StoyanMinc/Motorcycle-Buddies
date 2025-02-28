import { getUser } from '../../context/AuthContext'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import MotorcycleCard from '../motorcycle-card/MotorcycleCard';
import { useGetUserMotorcycles } from '../../hooks/useMotorcycle';
import { useChangePassword, useChangeProfileImage, useGetUser } from '../../hooks/useUser';

export default function Profile() {

    const [currentTab, setCurrentTap] = useState('your-motorcycles');

    const motorcycles = useGetUserMotorcycles();
    const userData = useGetUser();
    const imageUrl = `http://localhost:3000/${userData.image}`;

    const { changePasswordHandler, error: changePasswordError } = useChangePassword();
    const changeImageHandler = useChangeProfileImage();

    const changeTabHandler = (value) => setCurrentTap(value);

    const { register: registerPassword, handleSubmit: handlePasswordSubmit } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        let image_split = image.name.split(".");
        let image_type = image_split[image_split.length - 1];
        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image); // Convert file to Base64
            reader.onload = async () => {
                const base64File = reader.result.split(",")[1];
                try {
                    const result = await changeImageHandler(base64File, image_type);
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
            };
        }
    };

    return (
        <div className="page-container">

            <div className="profile-container">
                <div className="profile-side-panel">
                    <span onClick={() => changeTabHandler('your-motorcycles')}>your motorcycles</span>
                    <span onClick={() => changeTabHandler('profile-info')}>profile info</span>
                    <span onClick={() => changeTabHandler('edit-profile')}>edit profile</span>
                    <span onClick={() => changeTabHandler('change-password')}>change password</span>
                    <span>something...</span>
                    <span>notification</span>
                </div>
                {currentTab === 'edit-profile' &&
                    <div className="profile-info-container">

                        <div className="profile-header-container">
                            <div className="profile-picture-container">
                                <span>profile picture</span>
                                <img src={imageUrl} alt={userData.username} />
                            </div>
                            <div className="profile-image-settings-container">
                                <div className="change-image-container">
                                    <label className="profile-change-btn" htmlFor='profileImage'>Change picture</label>
                                    <input type="file" name='profileImage' id='profileImage' onChange={handleImageChange} />
                                </div>
                                <button className="profile-delete-btn">Delete picture</button>
                            </div>
                        </div>

                        <div className="form-container">
                            <form action="POST">
                                <div className="form-input-container">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" />
                                </div>
                                <div className="form-input-container">
                                    <label htmlFor="aboutme">About Me</label>
                                    <textarea name="aboutme" id="aboutme"></textarea>
                                </div>
                                <button className="profile-save-btn">Save changes</button>
                            </form>
                        </div>
                    </div>}
                {currentTab === 'your-motorcycles' &&
                    <div className="cards-wrapper">
                        {motorcycles.map(motorcycle => <MotorcycleCard key={motorcycle._id} motorcycle={motorcycle} />)}
                    </div>
                }

                {currentTab === 'change-password' &&
                    <div className="form-container">
                        <form action="POST" onSubmit={handlePasswordSubmit((values) => changePasswordHandler(values, setCurrentTap))}>
                            <div className="form-input-container">
                                <label htmlFor="password">Old Password</label>
                                <input type="password" name="password" id="password" {...registerPassword('oldPassword')} />
                            </div>
                            <div className="form-input-container">
                                <label htmlFor="newPassword">New Password</label>
                                <input type='password' name="newPassword" id="newPassword" {...registerPassword('newPassword')}></input>
                            </div>
                            <div className="form-input-container">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type='password' name="confirmPassword" id="confirmPassword" {...registerPassword('confirmPassword')}></input>
                            </div>
                            {changePasswordError && <p className='error'>{changePasswordError}</p>}
                            <button className="profile-save-btn">Change password</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}