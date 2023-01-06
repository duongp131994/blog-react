import httpClient from '../httpClient';

const getPublicContent = () => {
    return httpClient.get("/all");
};

const getUserBoard = () => {
    return httpClient('accessToken').get("/user");
};

const getModeratorBoard = () => {
    return httpClient('accessToken').get("/mod");
};

const getAdminBoard = () => {
    return httpClient('accessToken').get("/admin");
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
}