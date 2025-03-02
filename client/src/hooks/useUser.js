import { getUser } from "../context/AuthContext";
import { use, useEffect, useState } from "react";
import { changePassword, changeProfileImage, changeUserData, getUserFromServer } from "../api/user-api";

export function useGetUser() {
    const { user } = getUser();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        (async () => {
            const result = await getUserFromServer(user.userId);
            setUserData(result);
        })();
    }, []);

    return userData;
};

export function useChangeUserData() {
    const { user } = getUser();

    const [error, setError] = useState(null);

    const changeUserHandler = async (userData) => {
        try {
            const updatedUser = await changeUserData(user.userId, userData);
            return updatedUser;
        } catch (error) {
            setError(error.message);
        }
    };

    return { changeUserHandler, error };
}

export function useChangePassword() {
    const { user } = getUser();
    const [error, setError] = useState(null);

    const changePasswordHandler = async (values, changeTabHandler) => {
        if (values.newPassword !== values.confirmPassword) {
            return setError('Passwords don\'t match!');
        }

        setError(null);

        try {
            const userData = await changePassword({ userId: user.userId, oldPassword: values.oldPassword, newPassword: values.newPassword });
            changeTabHandler('your-motorcycles')
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