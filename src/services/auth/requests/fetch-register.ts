import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { RegisterFields } from "../../../types/register-fields";
import { REGISTER } from "./constants";

type RegisterRes = {
  success: true;
  user: {
    email: string;
    name: string;
  };
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

type RegisterData = {
  email: string;
  name: string;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
};

const endpoint = `${API_ENDPOINT}${REGISTER}`;

export const fetchRegister = createAsyncThunk<RegisterData, RegisterFields>(
  "auth/register",
  async (payload: RegisterFields) => {
    const response = await request<RegisterRes>(endpoint, {
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
    return Promise.reject("Failed to register users");
  }
);
