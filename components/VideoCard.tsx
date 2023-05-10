import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import useElementOnScreen from '../pages/hooks/useElementOnScreen';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({ post, isShowingOnHome }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.57,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef?.current?.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef?.current?.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if (!isShowingOnHome) {
    return (
      <div>
        <Link href={`/detail/${post._id}`}>
          <video
            loop
            src={post.video.asset.url}
            className="w-[250px] md:w-full rounded-xl cursor-pointer"
          ></video>
        </Link>
        <div className="flex gap-2 -mt-8 items-center ml-4">
          <p className="text-white text-lg font-medium flex gap-1 items-center">
            <BsPlay className="text-2xl" />
            {post.likes?.length || 0}
          </p>
        </div>
        <Link href={`/detail/${post._id}`}>
          <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">
            {post.caption}
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10 cursor-pointer">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2 cursor-pointer">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{' '}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${post._id}`}>
              <p className="mt-2 font-normal cursor-pointer ">{post.caption}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              className="lg:w-[700px] h-[450px] md:h-[500px] lg:h-[530px] w-[220px] rounded-2xl cursor-pointer bg-gray-100 lg:ml-0 ml-7"
              loop
              ref={videoRef}
              src={post.video.asset.url}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-3 md:bottom-6 cursor-pointer left-14 md:left-14 lg:left-0 lg:items-center lg:gap-20 flex gap-14 justify-between lg:justify-center w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
