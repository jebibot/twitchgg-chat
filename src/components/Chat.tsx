import { useContext } from "react";
import * as CSS from "csstype";
import ChatBadge from "./ChatBadge";
import { AppDispatch } from "../App";
import { ChatEntry } from "../utils/comments";
import { formatTimestamp } from "../utils/utils";
import "./Chat.css";

type ChatProps = {
  chat: ChatEntry;
};

function Chat({ chat }: ChatProps) {
  const appDispatch = useContext(AppDispatch);
  return (
    <div className="px-3 py-2">
      <span
        className="chat-timestamp mr-2"
        onClick={() =>
          appDispatch?.({ type: "seek", timestamp: chat.timestamp })
        }
      >
        {formatTimestamp(chat.timestamp)}
      </span>
      <span>
        {chat.badges?.map((b) => (
          <ChatBadge key={b._id} badge={b}></ChatBadge>
        ))}
      </span>
      <span style={{ color: chat.color } as CSS.Properties}>
        <span className="font-weight-bold">{chat.display_name}</span>
        {chat.display_name.toLowerCase() !== chat.name && (
          <span className="chat-username"> ({chat.name})</span>
        )}
      </span>
      <span aria-hidden="true">: </span>
      <span className="chat-message">
        {chat.message.map((m, i) =>
          m.emoticon ? (
            <img
              key={i}
              src={`https://static-cdn.jtvnw.net/emoticons/v1/${m.emoticon.emoticon_id}/1.0`}
              alt={m.text}
              className="my-n1 align-middle"
            ></img>
          ) : (
            <span key={i}>{m.text}</span>
          )
        )}
      </span>
    </div>
  );
}

export default Chat;
