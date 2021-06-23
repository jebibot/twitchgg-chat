import { useState, useEffect, useRef, createContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import * as Sentry from "@sentry/react";
import ProgressBar from "./ProgressBar";
import Chat from "./Chat";
import Twitch, { BadgeSetsData } from "../api/Twitch";
import getChats, { ChatEntry, isStreamer } from "../utils/comments";
import captureToPng from "../utils/html2canvas";

export const BadgesContext = createContext<BadgeSetsData | undefined>(
  undefined
);

type ChatListProps = {
  videoId: string;
};

function ChatList({ videoId }: ChatListProps) {
  const chatList = useRef<HTMLDivElement>(null);

  const [badges, setBadges] = useState<BadgeSetsData>();
  const [videoLength, setVideoLength] = useState(Infinity);
  const [chats, setChats] = useState<ChatEntry[]>([]);
  const [lastChat, setLastChat] = useState(0);
  const [error, setError] = useState("");

  function handleError(err: Error) {
    Sentry.captureException(err);
    if (err.name === "AbortError") return;
    setError((e) => `${e ? `${e}, ` : ""}${err.name}: ${err.message}`);
  }

  useEffect(() => {
    let abortController: AbortController | undefined;
    if ("AbortController" in window) {
      abortController = new AbortController();
    }

    const twitch = new Twitch(abortController?.signal);

    setChats([]);
    setError("");

    (async function () {
      const video = await twitch.getVideo(videoId);
      setVideoLength(video.length);

      setBadges(await twitch.getChannelBadges(video.channel._id));
    })().catch(handleError);

    (async function () {
      for await (const comments of twitch.iterateComments(videoId)) {
        if (comments?.length) {
          const chats = await getChats(comments);
          setLastChat(chats[chats.length - 1].timestamp);
          setChats((c) => c.concat(chats.filter(isStreamer)));
        }
      }

      setLastChat(Infinity);
      setTimeout(() => {
        setLastChat(-1);
      }, 3000);
    })().catch(handleError);

    return () => {
      abortController?.abort();
    };
  }, [videoId]);

  const progress = (Math.min(lastChat / videoLength, 1) * 100).toFixed(2);

  return (
    <BadgesContext.Provider value={badges}>
      <div className="d-flex">
        <div className="p-1">
          <button
            type="button"
            className="btn btn-primary f-14"
            aria-label="Download as an image"
            title="Download as an image"
            onClick={() => {
              if (!chatList.current) return;
              captureToPng(chatList.current, `chat-${videoId}.png`);
            }}
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
        <div className="flex-grow-1 my-auto">
          <ProgressBar error={error} progress={progress}></ProgressBar>
        </div>
        <div className="p-1">
          <a
            href="https://www.notion.so/Rechat-63ee83dd92384963a162895ac2553f70"
            className="btn btn-secondary f-14"
            aria-label="Info"
            title="Info"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
        </div>
      </div>
      <div ref={chatList}>
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat}></Chat>
        ))}
      </div>
    </BadgesContext.Provider>
  );
}

export default ChatList;
