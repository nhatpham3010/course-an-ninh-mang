import { getConfig } from "../configs/getConfig.config";

const getBaseUrl = () => {
  const { apiUrl } = getConfig();
  return apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
};

export default {
  AUTH: {
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
    LOGOUT: `/auth/logout`,
    FORGOT: `/auth/forgot-password`,
    VERIFICATION_OTP: `/auth/verify-reset-code`,
    RESET_PASSWORD: `/auth/update-password`,
  },
  USER: {},
};
