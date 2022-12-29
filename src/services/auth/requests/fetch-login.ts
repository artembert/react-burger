import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { SignInFields } from "../../../types/sign-in-fields";
import { User } from "../../../types/user";
import { LOGIN } from "./constants";

type LoginRes = {
  success: true;
  user: User;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

type LoginData = {
  email: string;
  name: string;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

const endpoint = `${API_ENDPOINT}${LOGIN}`;

export const fetchLogin = createAsyncThunk<LoginData, SignInFields>("auth/signIn", async (payload) => {
  const response = await request<LoginRes>(endpoint, {
    method: HttpMethod.POST,
    body: payload,
  });
  if (response.success) {
    return {
      email: response.user.email,
      name: response.user.name,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  }
  return Promise.reject("Failed to login");
});
