export const fetchUser = () => {
    const userInfo = localStorage.getItem('user');
    const jsonString = JSON.stringify(userInfo);
    if (userInfo !== null) {
        return JSON.parse(jsonString);
    } else {
        localStorage.clear();
        return null; // or return an empty object if preferred: return {};
    }
}