import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import {
  onCloseConnection,
  connectionError,
  connectionSuccess,
  FeedActions,
  openConnection,
  sendMessage,
  closeConnection,
  getMessage,
} from "../feed";

export const webSocketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: FeedActions) => {
      const { dispatch } = store;

      if (openConnection.match(action)) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(connectionSuccess(event));
        };

        socket.onerror = (event) => {
          dispatch(connectionError(event));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(getMessage(JSON.parse(data)));
        };

        socket.onclose = (event) => {
          dispatch(onCloseConnection(event));
        };

        if (sendMessage.match(action)) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }

        if (closeConnection.match(action)) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
