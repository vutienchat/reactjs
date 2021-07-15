import UserAPI from "../api/UserAPI";

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
        next();
    }
}
export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
    } else {
        return false
    }
}
export const signOut = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        next()
        return UserAPI.signOut();
    }
}