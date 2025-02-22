export function getAccessToken() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData) {
        return userData.accessToken
    };
}