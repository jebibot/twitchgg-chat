import React, { useReducer, createContext } from "react";
import ChatList from "./components/ChatList";
import TwitchVODPlayer from "./components/TwitchVODPlayer";

type AppAction = {
  type: "seek";
  timestamp: number;
};

const initialState = {
  timestamp: 0,
};
export const AppDispatch = createContext<React.Dispatch<AppAction> | null>(
  null
);

function reducer(state: typeof initialState, action: AppAction) {
  switch (action.type) {
    case "seek":
      return {
        timestamp: action.timestamp,
      };
  }
}

function App() {
  const videoId = window.location.pathname.match(
    /^\/(?:[^/]+\/v(?:ideo)?|videos)\/(\d+)/
  )?.[1];
  const [app, dispatch] = useReducer(reducer, initialState);

  return (
    <AppDispatch.Provider value={dispatch}>
      <div className="container-fluid h-100 px-0">
        {videoId ? (
          <div className="row flex-column flex-md-row flex-nowrap h-100 no-gutters">
            <div className="col-md-9 flex-grow-0 flex-shrink-0 overflow-hidden">
              <TwitchVODPlayer
                videoId={videoId}
                time={app.timestamp}
              ></TwitchVODPlayer>
            </div>
            <div className="col-md-3 flex-grow-1 flex-shrink-1 h-100 overflow-auto">
              <ChatList videoId={videoId}></ChatList>
            </div>
          </div>
        ) : (
          <div className="alert alert-danger m-3" role="alert">
            Video ID not found!
          </div>
        )}
      </div>
    </AppDispatch.Provider>
  );
}

export default App;
