import { useNavigate } from "react-router-dom";
import { getUser } from "../context/AuthContext";
import { useState } from "react";
// import { changePassword } from "../api/auth-api";
import { changePassword, changeProfileImage } from "../api/user-api";

export function useChangePassword() {
    const { user } = getUser();
    const [error, setError] = useState(null);

    const changePasswordHandler = async (values, setCurrentTab) => {
        if (values.newPassword !== values.confirmPassword) {
            return setError('Passwords don\'t match!');
        }

        setError(null);

        try {
            const userData = await changePassword({ userId: user.userId, oldPassword: values.oldPassword, newPassword: values.newPassword });
            setCurrentTab('your-motorcycles')
        } catch (error) {
            setError(error.message);
        }

    }

    return { changePasswordHandler, error };
};

export function useChangeProfileImage() {
    const { user } = getUser();

    const changeImageHandler = async (image, imageType) => {
        try {
            const result = await changeProfileImage({ userId: user.userId, image, imageType });
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }

    return changeImageHandler;
}