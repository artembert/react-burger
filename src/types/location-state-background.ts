import { ReactRouterLocation } from "./react-router-location";

export type LocationStateBackground = ReactRouterLocation["state"] & {
  background: ReactRouterLocation;
};
