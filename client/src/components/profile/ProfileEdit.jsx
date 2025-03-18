import { useForm } from "react-hook-form";
import { useChangeProfileImage, useChangeUserData } from "../../hooks/useUser";

export default function ProfileEdit({
    user,
    changeTab,
    updateUser
}) {

    const changeImageHandler = useChangeProfileImage();
    const { changeUserHandler, error } = useChangeUserData();

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
                    updateUser(result);
                    changeTab('profile-info');
                } catch (error) {
                    console.log(error.message);
                }
            };
        }
    };

    const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm({
        defaultValues: {
            email: user.email,
            facebook: user.facebook,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber
        }
    });

    const handleProfile = async (values) => {
        try {
            const updatedUser = await changeUserHandler(values);
            updateUser(updatedUser);
            changeTab('profile-info');

        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="profile-info-container">

            <div className="profile-header-container">
                <div className="profile-picture-container">
                    <span>profile picture</span>
                    <img src={user.image !== undefined ? `https://motorcycle-buddies.live:3000/${user.image}` : 'images/profile-avatar.avif'} alt={user.username} />
                </div>
                <div className="profile-image-settings-container">
                    <div className="change-image-container">
                        <label className="profile-change-btn" htmlFor='profileImage'>Change picture</label>
                        <input type="file" name='profileImage' id='profileImage' onChange={handleImageChange} />
                    </div>
                    {/* <button className="profile-delete-btn">Delete picture</button> */}
                </div>
            </div>

            <div className="form-container">
                <form action="POST" onSubmit={handleProfileSubmit(handleProfile)}>
                    <div className="form-input-container">
                        <label htmlFor="email">email</label>
                        <input type='text' name="email" id="email" {...registerProfile('email')}></input>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="facebook">facebook</label>
                        <input type='text' name="facebook" id="facebook" {...registerProfile('facebook')}></input>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input type='text' name="dateOfBirth" id="dateOfBirth" {...registerProfile('dateOfBirth')} ></input>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type='text' name="phoneNumber" id="phoneNumber" {...registerProfile('phoneNumber')} ></input>
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <button className="profile-save-btn">Save changes</button>
                </form>
            </div>
        </div>
    )
}