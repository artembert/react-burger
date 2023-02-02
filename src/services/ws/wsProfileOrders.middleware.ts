import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import {
  onCloseConnection,
  connectionError,
  connectionSuccess,
  ProfileOrdersActions,
  openConnection,
  sendMessage,
  closeConnection,
  getMessage,
} from "../profile-orders";

export const wsProfileOrdersSocketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let token: string | null = null;

    return (next) => (action: ProfileOrdersActions) => {
      const { dispatch } = store;

      if (openConnection.match(action)) {
        socket = new WebSocket(`${action.payload.url}?token=${action.payload.token}`);
        token = action.payload.token;
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
          socket = null;
        };

        if (sendMessage.match(action)) {
          const message = action.payload;
          socket.send(JSON.stringify({ ...message, token }));
        }

        if (closeConnection.match(action)) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
