import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpMethod, request } from "../../../app/helpers/request";
import { API_ENDPOINT } from "../../../app/constants";
import { User } from "../../../types/user";
import { USER } from "./constants";
import { fetchRefreshToken } from "./fetch-refresh-token";
import { getRefreshToken } from "../../token";

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

const userRequest = async () => {
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
  if (response.message === "jwt expired") {
    return Promise.reject({
      isJwtExpired: true,
    });
  }
  return Promise.reject("Failed to fetch user");
};
export const fetchUser = createAsyncThunk<UserData>("auth/user", async () => {
  try {
    return userRequest();
  } catch (e: unknown) {
    if ((e as { isJwtExpired: boolean })?.isJwtExpired) {
      await fetchRefreshToken(getRefreshToken());
      return userRequest();
    }
    return Promise.reject("Failed to fetch user");
  }
});
