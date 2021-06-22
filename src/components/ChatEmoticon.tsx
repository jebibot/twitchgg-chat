const EMOTICON_URL = "https://static-cdn.jtvnw.net/emoticons/v1/";

type ChatEmoticonProps = {
  emoticonId: string;
  name: string;
};

function ChatEmoticon({ emoticonId, name }: ChatEmoticonProps) {
  return (
    <img
      src={`${EMOTICON_URL}${emoticonId}/1.0`}
      srcSet={`${EMOTICON_URL}${emoticonId}/1.0 1x, ${EMOTICON_URL}${emoticonId}/2.0 2x, ${EMOTICON_URL}${emoticonId}/3.0 4x`}
      alt={name}
      className="my-n1 align-middle"
    ></img>
  );
}

export default ChatEmoticon;
