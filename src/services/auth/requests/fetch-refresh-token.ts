import { HttpMethod, requestOnce } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { TOKEN } from "./constants";
import { TokensPair } from "../../../types/tokens-pair";

const endpoint = `${API_ENDPOINT}${TOKEN}`;

type RefreshTokenRes = {
  success: boolean;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

export const fetchRefreshToken: (refreshToken: string) => Promise<TokensPair> = async (refreshToken) => {
  const response = await requestOnce<RefreshTokenRes>(endpoint, {
    method: HttpMethod.POST,
    body: { token: refreshToken },
  });
  if (response.success) {
    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  }
  return Promise.reject("Failed to refresh token");
};
