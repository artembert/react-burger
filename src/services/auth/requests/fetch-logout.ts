import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { LOGOUT } from "./constants";

type LogoutRes = {
  success: true;
  message: string;
};

type LogoutData = {
  message: string;
};

type LogoutFields = {
  token: string;
};

const endpoint = `${API_ENDPOINT}${LOGOUT}`;

export const fetchLogout = createAsyncThunk<LogoutData, LogoutFields>("auth/logout", async (payload) => {
  const response = await request<LogoutRes>(endpoint, {
    method: HttpMethod.POST,
    body: payload,
  });
  if (response.success) {
    return {
      message: response.message,
    };
  }
  return Promise.reject("Failed to logout");
});
