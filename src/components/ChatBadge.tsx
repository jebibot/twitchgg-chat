import { useContext } from "react";
import { BadgesContext } from "./ChatList";
import { BadgeData } from "../utils/comments";
import "./ChatBadge.css";

type ChatBadgeProps = {
  badge: BadgeData;
};

function ChatBadge({ badge }: ChatBadgeProps) {
  const badges = useContext(BadgesContext);
  if (!badges) return null;

  let url = "";
  try {
    url = badges
      .getBadgeSet(badge._id)
      .getVersion(badge.version)
      .getImageUrl(1);
  } catch (err) {
    return null;
  }
  return (
    <img src={url} alt={badge._id} className="chat-badge align-middle"></img>
  );
}

export default ChatBadge;
