import React, { useRef, useState } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import {Play, Pause} from "lucide-react";

type CloudVideoPlayerProps = {
    url: string;
}
const CloudVideo = ({ url }: CloudVideoPlayerProps) => {
    const playerRef = useRef<any>(null);
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        playerRef.current?.play();
    };

    const handlePause = () => {
        playerRef.current?.pause();
    };

    return (
        <div className="shrink-0 relative w-37.5 h-50 bg-black border border-muted-border rounded-lg overflow-hidden">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 text-foreground bg-muted-border/30 rounded-full cursor-pointer">
                {playing ? (
                    <Pause size={16} onClick={() => { handlePause(); setPlaying(false); }} />
                ) : (
                    <Play size={16} onClick={() => { handlePlay(); setPlaying(true); }} />
                )}
            </div>

            <CldVideoPlayer
                src={url}
                className="w-full h-full object-cover"
                controls={false}
                playerRef={playerRef}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                // @ts-ignore
                playerOptions={{
                    bigPlayButton: false,
                    fluid: false
                }}
            />
            {/*<video*/}
            {/*    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${url}.mp4`}*/}
            {/*    className="absolute inset-0 w-full h-full object-cover block"*/}
            {/*    muted*/}
            {/*/>*/}
        </div>
    );
};

export default CloudVideo;