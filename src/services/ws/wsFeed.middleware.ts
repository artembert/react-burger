import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import {
  onCloseFeedConnection,
  feedConnectionSuccess,
  feedConnectionError,
  FeedActions,
  openFeedConnection,
  sendFeedMessage,
  closeFeedConnection,
  getFeedMessage,
} from "../feed";

export const webFeedSocketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: FeedActions) => {
      const { dispatch } = store;

      if (openFeedConnection.match(action)) {
        socket = new WebSocket(action.payload.url);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(feedConnectionSuccess(event));
        };

        socket.onerror = (event) => {
          dispatch(feedConnectionError(event));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(getFeedMessage(JSON.parse(data)));
        };

        socket.onclose = (event) => {
          dispatch(onCloseFeedConnection(event));
          socket = null;
        };

        if (sendFeedMessage.match(action)) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }

        if (closeFeedConnection.match(action)) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
