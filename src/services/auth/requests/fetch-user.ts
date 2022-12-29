import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { User } from "../../../types/user";
import { USER } from "./constants";

type UserRes = {
  success: true;
  user: User;
};

type UserData = User;

const endpoint = `${API_ENDPOINT}${USER}`;

export const fetchUser = createAsyncThunk<UserData>("auth/user", async () => {
  const response = await request<UserRes>(endpoint, {
    method: HttpMethod.GET,
    authorization: true,
  });
  if (response.success) {
    return {
      name: response.user.name,
      email: response.user.email,
    };
  }
  return Promise.reject("Failed to fetch user");
});
