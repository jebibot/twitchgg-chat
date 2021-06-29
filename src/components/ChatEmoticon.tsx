const EMOTICON_URL = (id: string, scale: number) =>
  `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/light/${scale}.0`;

type ChatEmoticonProps = {
  emoticonId: string;
  name: string;
};

function ChatEmoticon({ emoticonId, name }: ChatEmoticonProps) {
  return (
    <img
      src={`${EMOTICON_URL(emoticonId, 1)}`}
      srcSet={`${EMOTICON_URL(emoticonId, 1)} 1.0x, ${EMOTICON_URL(
        emoticonId,
        2
      )} 2.0x, ${EMOTICON_URL(emoticonId, 3)} 3.0x`}
      alt={name}
      className="my-n1 align-middle"
    ></img>
  );
}

export default ChatEmoticon;
