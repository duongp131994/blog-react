import axios from 'axios';

const authHeader = (hasToken) => {
    const user = JSON.parse(localStorage.getItem('D_user'));
    const accessToken = user && user.accessToken ? {Authorization: user.accessToken} : {}
    const header = {"Content-Type": "application/json"}

    if (hasToken === 'accessToken')
        Object.assign(header, accessToken)

    return header;
}

const httpClient = (hasToken) => {
    const authHeaderData = authHeader(hasToken)

    return axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 10000,
        headers: authHeaderData
    });
}

export default httpClient;