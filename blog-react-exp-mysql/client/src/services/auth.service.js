import httpClient from '../httpClient'
import {setMessage} from "../store/message";

const signup = async ({username, email, password}) => {
    try {
        const data = await httpClient('').post('/api/auth/signup', {username, email, password})
        console.log(data)
        return [true, data]
    } catch (error) {
        console.warn(error)
        if (error.response) {
            return [false, error.response.data]
        } else if (error.request) {
            return [false, error.request]
        } else {
            return [false, error.message]
        }
    }
}
const login = async ({email, password}) => {
    console.log('userLogin')
    try {
        const response = await httpClient('').post('/api/auth/signin', {
            email,
            password,
        })
        console.log(response)
        if (response.data) {
            if (typeof response.data.message !== 'undefined') {
                return [false, response.data.message]
            }

            return [true, response.data]
        }
        return [false, null]
    } catch (error) {
        console.warn(error)
        if (error.response) {
            return [false, error.response.data]
        } else if (error.request) {
            return [false, error.request]
        } else {
            return [false, error.message]
        }
    }
}

const logout = () => {
    localStorage.removeItem("D_user");
    // return httpClient.post("/api/auth/logout").then((response) => {
    //     return response.data;
    // });
};

const getCurrentUser = () => {
    let D_user = JSON.parse(localStorage.getItem("D_user"))
    // JSON.parse(localStorage.getItem("D_user"))
    return D_user?.userData || null;
};

const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("D_user"));
    return user?.refreshToken;
}

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
}

const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("D_user"));
    user.accessToken = token;
    localStorage.setItem("D_user", JSON.stringify(user));
}

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser,
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
}

export default AuthService;