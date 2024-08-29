import React, { useEffect, useRef, FC } from 'react';
import useDemoStore from './DemoStore';
import { scrollIntoView } from '../../lib/utils/ui-animation-helpers';

interface DemoCommentProps {
  comment: string;
  id: string;
  date: string;
  name: string;
  parent: React.RefObject<HTMLDivElement>;
  className?: string;
  imgNum?: number
}

const DemoComment: FC<DemoCommentProps> = ({ comment, id, date, name, parent, className, imgNum = 0 }) => {
  const commentRef = useRef<HTMLDivElement>(null);

  const apiImgs = ["https://api.dicebear.com/9.x/notionists/svg?seed=Mia", "https://api.dicebear.com/9.x/notionists/svg?seed=Midnight", "https://api.dicebear.com/9.x/notionists/svg?seed=Kitty"]
  const selected = useDemoStore((state) => state.selected);
  const updateSelected = useDemoStore((state) => state.updateSelected);


  useEffect(() => {
    if (selected === id && parent.current && commentRef.current) {
      scrollIntoView({ parent: parent.current, child: commentRef.current });
    }
  }, [selected, id, parent]);

  return (
    <div
      className={`flex flex-col mb-2 gap-2 rounded-md p-4 ${selected === id ? 'motion-reduce:animate-pulse bg-pink-300' : 'bg-sky-200'} ${className}`}
      ref={commentRef}
      onClick={() => updateSelected(id)}
    >
      <div className="flex items-center gap-4">
        <img
          className='h-12 w-12 rounded-full'
          src={apiImgs[imgNum]}
          alt="avatar" />
        <div className="flex flex-col">
          <p className="text-slate-600 break-words">{name}</p>
          <p className="text-slate-600 text-sm">{date}</p>
        </div>
      </div>
      <p className="break-words">{comment}</p>
    </div>
  );
};

export default DemoComment;
