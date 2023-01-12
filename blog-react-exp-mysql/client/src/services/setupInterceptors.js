import httpClient from '../httpClient'
import AuthService from "./auth.service";

const setup = (store) => {
    httpClient('').interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            console.log(err)
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await httpClient('accessToken').post("/auth/refresh", {
                        refreshToken: AuthService.getLocalRefreshToken(),
                    });

                    const { accessToken } = rs.data;

                    dispatch(refreshToken(accessToken));
                    TokenService.updateLocalAccessToken(accessToken);

                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }

            return Promise.reject(err);
        }
    );
}