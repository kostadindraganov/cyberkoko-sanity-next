"use client"

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { PiSpeakerHighLight } from "react-icons/pi";
import { PiSpeakerSlash } from "react-icons/pi";

const AudioToggle = () => {
  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  
  const audioElementRef = useRef(null);
  
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };


  // Manage audio playback
  useEffect(() => {
    if (audioElementRef.current) {
      const audioElement = audioElementRef.current as HTMLAudioElement;
      if (isAudioPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isAudioPlaying]);



  return (
   		<>
	      <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
            >
              {isAudioPlaying 
              ? <span><PiSpeakerHighLight className="text-white mr-2 mb-0.5"/></span>
              : <span><PiSpeakerSlash className="text-white mr-2 mb-0.5"/></span>
              }

              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
	 </>
  );
};

export default AudioToggle;