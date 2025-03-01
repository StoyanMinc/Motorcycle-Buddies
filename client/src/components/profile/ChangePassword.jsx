import { useForm } from 'react-hook-form';

import { useChangePassword } from "../../hooks/useUser";

export default function ChangePassword({changeTab}) {
    const { changePasswordHandler, error: changePasswordError } = useChangePassword();
    

    const { register: registerPassword, handleSubmit: handlePasswordSubmit } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    return( 
        <div className="form-container">
        <form action="POST" onSubmit={handlePasswordSubmit((values) => changePasswordHandler(values, changeTab))}>
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
    )
}