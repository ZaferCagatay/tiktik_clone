import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-5xl">
        {text === 'No comments yet! Be the first one to add a comment.' ? (
          <BiCommentX color="gray" />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-lg text-center text-gray-500">{text}</p>
    </div>
  );
};

export default NoResults;
