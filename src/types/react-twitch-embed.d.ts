declare module "react-twitch-embed" {
  import * as React from "react";

  type TwitchPlayerProps = {
    id?: string;
    channel?: string;
    collection?: string;
    video?: string;
    height?: string | number;
    width?: string | number;
    playsInline?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    allowFullscreen?: boolean;
    time?: string;
    hideControls?: boolean;
    onEnded?: () => void;
    onPause?: () => void;
    onPlay?: () => void;
    onPlaybackBlocked?: () => void;
    onPlaying?: () => void;
    onOffline?: () => void;
    onOnline?: () => void;
    onReady?: () => void;
    parent?: string[];
  } & React.HTMLAttributes<HTMLDivElement>;

  interface PlayerInterface {
    pause(): void;
    play(): void;
    seek(timestamp: number): void;
    setChannel(channel: string): void;
    setCollection(collection: string, video?: string);
    setQuality(quality: string);
    setVideo(video: string, timestamp: number);
    getMuted(): boolean;
    setMuted(muted: boolean);
    getVolume(): number;
    setVolume(level: number): void;
    getPlaybackStats(): any;
    getChannel(): string;
    getCurrentTime(): number;
    getDuration(): number;
    getEnded(): boolean;
    getQualities(): string[];
    getQuality(): string;
    getVideo(): string;
    isPaused(): boolean;
  }

  export class TwitchPlayer extends React.Component<TwitchPlayerProps, any> {
    player: PlayerInterface;
  }
}
