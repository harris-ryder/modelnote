import React, { useEffect, useState } from 'react';
import useEditorStore from '../EditorStore';
import Button from '../../ui/Button';
import { useApiStore } from '../../../store/api-store';

const NewComment: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const updateCommentMode = useEditorStore((state) => state.updateCommentMode);
  const updateTagSize = useEditorStore((state) => state.updateTagSize);
  const [sliderIndex, setSliderIndex] = useState<number>(0.1);
  const clearTempTags = useEditorStore((state) => state.clearTempTags);
  const addComment = useEditorStore((s) => s.addComment);
  const toggleShowComments = useEditorStore((s) => s.toggleShowComments)
  const comments = useEditorStore((s) => s.comments);

  const userPicUrl = useApiStore((s) => s.userPicUrl)
  const user = useApiStore((s) => s.user)


  // Typing the input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  // Typing the slider change event
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderIndex(parseFloat(event.target.value));
  };

  useEffect(() => {
    console.log("Comments: ", comments);
  }, [comments]);

  return (
    <div className='bg-sky-200 bg-opacity-50 p-2 rounded mt-2 pointer-events-auto w-full'>
      <input
        className='border border-sky-300 p-2 mb-2 min-h-[50px] cursor-text rounded no-focus-outline w-full'
        type="text"
        placeholder='Set pin scale with slider below!'
        value={content}
        onChange={handleInputChange}
      />
      <input
        className="w-full accent-sky-600 border-0 slider"
        type="range"
        value={sliderIndex}
        min="0.1"
        max="40"
        onMouseUp={() => updateTagSize(sliderIndex)}
        onChange={handleSliderChange}
      />
      <div className='flex gap-2'>
        <Button className='flex-1 button' onClick={() => {
          if (!content || content === '') return
          addComment(content, userPicUrl, user.user_metadata.full_name)
          toggleShowComments(true)
        }}
        >
          Submit
        </Button>
        <Button className='flex-1 button' onClick={() => {
          updateCommentMode(false);
          clearTempTags();
        }}>
          Cancel
        </Button>
      </div>
    </div >
  );
};

export default NewComment;


