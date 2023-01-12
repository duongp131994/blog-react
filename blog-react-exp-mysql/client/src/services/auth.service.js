import httpClient from '../httpClient'

const signup = async ({username, email, password}) => {
    try {
        const response = await httpClient('').post('/api/auth/signup', {username, email, password})
    } catch (e) {
        console.warn(e)
    }
}
const login = async (username, password) => {
    console.log('userLogin')
    try {
        const response = await httpClient('').post('/api/auth/signin', {
            username,
            password,
        })
    } catch (e) {
        console.warn(e)
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