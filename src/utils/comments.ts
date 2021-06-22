import { ApiClient } from "twitch";
import { ColorAdjuster } from "./color";

const BOTS = [
  "ssakdook",
  "bbangddeock",
  "cubicbot_",
  "streamelements",
  "twipkr",
];
const BADGES = ["broadcaster", "vip", "moderator", "partner"];

type CommentsQuery = {
  cursor?: string;
  content_offset_seconds?: string;
};

type CommenterData = {
  _id: string;
  bio: string | null;
  created_at: string;
  display_name: string;
  logo: string;
  name: string;
  type: string;
  updated_at: string;
};

type EmoticonData = {
  _id: string;
  begin: number;
  end: number;
};

type EmoticonFragmentData = {
  emoticon_id: string;
  emoticon_set_id: string;
};

type FragmentData = {
  text: string;
  emoticon?: EmoticonFragmentData;
};

export type BadgeData = {
  _id: string;
  version: string;
};

type MessageData = {
  body: string;
  emoticons?: EmoticonData[];
  fragments: FragmentData[];
  is_action: boolean;
  user_badges?: BadgeData[];
  user_color?: string;
  user_notice_params: any;
};

type CommentData = {
  _id: string;
  channel_id: string;
  commenter: CommenterData;
  content_id: string;
  content_offset_seconds: number;
  content_type: string;
  created_at: string;
  message: MessageData;
  source: string;
  state: string;
  updated_at: string;
};

type CommentsData = {
  comments?: CommentData[];
  _next?: string;
  _prev?: string;
};

export type ChatEntry = {
  id: string;
  timestamp: number;
  display_name: string;
  name: string;
  color: string | null;
  badges: BadgeData[] | undefined;
  message: FragmentData[];
};

const colorAdjuster = new ColorAdjuster("#ffffff", 1);

async function fetchComments(
  apiClient: ApiClient,
  videoId: string,
  cursor: string | undefined
) {
  const query: CommentsQuery = {};
  if (cursor) {
    query.cursor = cursor;
  } else {
    query.content_offset_seconds = "0";
  }
  const { comments, _next } = await apiClient.callApi<CommentsData>({
    url: `videos/${videoId}/comments`,
    query,
  });

  const chats: ChatEntry[] = comments
    ? comments.map((c) => ({
        id: c._id,
        timestamp: c.content_offset_seconds,
        display_name: c.commenter.display_name,
        name: c.commenter.name,
        color: colorAdjuster.process(c.message.user_color),
        badges: c.message.user_badges,
        message: c.message.fragments,
      }))
    : [];
  return { chats, _next };
}

export function isStreamer(c: ChatEntry) {
  return (
    !!c.badges &&
    c.badges.some((b) => BADGES.includes(b._id)) &&
    !c.name.endsWith("bot") &&
    !BOTS.includes(c.name)
  );
}

export default fetchComments;
