import httpClient from '../httpClient';

const getPublicContent = () => {
    return httpClient.get("/all");
};

const getUserBoard = () => {
    return httpClient.get("/user");
};

const getModeratorBoard = () => {
    return httpClient.get("/mod");
};

const getAdminBoard = () => {
    return httpClient.get("/admin");
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
}