import { ValueOf } from "../types";

export const WsConnectionState = {
  IDLE: "IDLE",
  CONNECTED: "CONNECTED",
  ERROR: "ERROR",
} as const;

export type TWsConnectionState = ValueOf<typeof WsConnectionState>;
