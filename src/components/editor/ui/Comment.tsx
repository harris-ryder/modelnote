import React, { useEffect, useRef, RefObject } from 'react';
import useEditorStore from '../EditorStore';
import { scrollIntoView } from '../../../lib/utils/ui-animation-helpers';
import { CommentData } from '../../../types/index';
import { X } from 'lucide-react';

interface CommentProps {
  comment: CommentData;
  parentRef: RefObject<HTMLDivElement>; // Properly type the parentRef
}

const Comment: React.FC<CommentProps> = ({ comment, parentRef }) => {
  const selectedComment = useEditorStore((s) => s.selectedComment);
  const updateSelectedComment = useEditorStore((s) => s.updateSelectedComment);

  // Type the commentRef correctly
  const commentRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    const time = date.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    return `${time} ${formattedDate}`;
  };

  useEffect(() => {
    if (selectedComment === comment.id && parentRef.current && commentRef.current) {
      scrollIntoView({ parent: parentRef.current, child: commentRef.current });
    }
  }, [selectedComment, comment.id, parentRef]);

  return (
    <div
      ref={commentRef}
      className={`flex flex-col relative group mb-2 gap-2 rounded p-4 ${selectedComment === comment.id ? 'bg-pink-200' : 'bg-sky-200'
        }`}
      onClick={() => {
        if (selectedComment !== comment.id) updateSelectedComment(comment.id);
      }}
    >
      <X className='absolute w-4 h-4 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      <div className='flex items-center gap-4'>
        <img src={comment.profile_img_url} className='w-6 h-6 rounded-full' />
        <div className='flex flex-col'>
          <p className='break-words text-xs'>{comment.user_name}</p>
          <p className='text-xs'>{formatDate(comment.created_at)}</p>
        </div>
      </div>
      <p className='break-words text-sm'>
        {comment.content}
      </p>
    </div>
  );
};

export default Comment;

