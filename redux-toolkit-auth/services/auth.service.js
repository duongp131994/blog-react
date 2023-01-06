import httpClient from '../httpClient';

const register = (username, email, password) => {
    return httpClient.post("/signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return httpClient
        .post("/signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.username) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return httpClient.post("/signout").then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;