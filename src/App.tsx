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
          <div className="row no-gutters f-14 p-3">
            <div className="col-12 border border-primary rounded-pill px-3 py-2">
              https://www.twitch<strong>gg</strong>.tv/videos/12345678
            </div>
            <div className="col-12 px-3 mt-2">
              Insert "<strong>gg</strong>" after the word "twitch" in the link
              to replay chats by streamers from Twitch streams.
            </div>
            <div className="col-12 px-3 mt-2" lang="ko">
              트위치 다시보기 링크의 "twitch" 뒤에 "<strong>gg</strong>"를
              삽입하면 스트리머의 채팅을 모아볼 수 있습니다.
            </div>
          </div>
        )}
      </div>
    </AppDispatch.Provider>
  );
}

export default App;
