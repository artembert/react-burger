import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { User } from "../../../types/user";
import { USER } from "./constants";

type Payload = {
  name: string;
  email: string;
  password: string;
};

type UserRes =
  | {
      success: true;
      user: User;
    }
  | {
      success: false;
      message: string;
    };

const endpoint = `${API_ENDPOINT}${USER}`;

export const fetchUpdateUser = createAsyncThunk<User, Payload>("auth/update", async (payload) => {
  const response = await request<UserRes>(endpoint, {
    method: HttpMethod.PATCH,
    body: payload,
    authorization: true,
  });
  if (response.success) {
    return {
      email: response.user.email,
      name: response.user.name,
    };
  }
  return Promise.reject("Failed to update users");
});
