import { useContext } from "react";
import { BadgesContext } from "./ChatList";
import { BadgeData } from "../utils/comments";
import styles from "./ChatBadge.module.css";

type ChatBadgeProps = {
  badge: BadgeData;
};

function ChatBadge({ badge }: ChatBadgeProps) {
  const badges = useContext(BadgesContext);
  if (!badges) return null;

  let b;
  try {
    b = badges.getBadgeSet(badge._id).getVersion(badge.version);
  } catch (err) {
    return null;
  }
  return (
    <img
      src={b.getImageUrl(1)}
      srcSet={`${b.getImageUrl(1)} 1x, ${b.getImageUrl(2)} 2x, ${b.getImageUrl(
        4
      )} 4x`}
      alt={b.title}
      className={`${styles.badge} align-middle`}
    ></img>
  );
}

export default ChatBadge;
