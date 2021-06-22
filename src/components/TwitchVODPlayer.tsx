import { useEffect, useRef } from "react";
import { TwitchPlayer } from "react-twitch-embed";

type TwitchVODPlayerProps = {
  videoId: string;
  time: number;
};

function TwitchVODPlayer({ videoId, time }: TwitchVODPlayerProps) {
  const twitchPlayer = useRef<TwitchPlayer>(null);

  useEffect(() => {
    twitchPlayer.current?.player?.seek(time);
  }, [time]);

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <TwitchPlayer
        ref={twitchPlayer}
        video={videoId}
        className="embed-responsive-item max-vh-100"
        width="100%"
        height="100%"
        autoplay={false}
      ></TwitchPlayer>
    </div>
  );
}

export default TwitchVODPlayer;
