import httpClient from '../httpClient'
import AuthService from "./services/auth.service";

const setup = (store) => {
    httpClient('').interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            //TODO: keim tra lai response tra ve
            if (originalConfig.url !== "/auth/signin" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await httpClient('accessToken').post("/auth/refreshtoken", {
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
            }

            return Promise.reject(err);
        }
    );
}