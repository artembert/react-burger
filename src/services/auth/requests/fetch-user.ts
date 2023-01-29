import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { User } from "../../../types/user";
import { USER } from "./constants";

type UserRes =
  | {
      success: true;
      user: User;
    }
  | {
      success: false;
      message: string;
    };

type UserData = User;

const endpoint = `${API_ENDPOINT}${USER}`;

export const fetchUser = createAsyncThunk<UserData>("auth/user", async () => {
  return request<UserRes>(endpoint, {
    method: HttpMethod.GET,
    authorization: true,
  }).then((res) => {
    if (res.success) {
      return {
        email: res.user.email,
        name: res.user.name,
      };
    }
    return Promise.reject("Unable to fetch user");
  });
});
