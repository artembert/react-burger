import { TWsConnectionState, WsConnectionState } from "../../types/ws-connection-state";
import { LoadingStatus } from "../../types/loading-status";
import { LoadingState } from "../../types/loading-state";

export const mapWsToToLoadingStatus = (ws: TWsConnectionState): LoadingStatus => {
  switch (ws) {
    case WsConnectionState.IDLE:
      return LoadingState.LOADING;
    case WsConnectionState.CONNECTED:
      return LoadingState.SUCCESSFUL;
    case WsConnectionState.ERROR:
      return LoadingState.ERROR;
  }
};
