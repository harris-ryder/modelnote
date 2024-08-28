import { useRef, useEffect } from 'react';
import NewComment from './NewComment';
import useEditorStore from '../EditorStore';
import Comment from './Comment';
import { ChevronUp, MessageSquarePlus } from 'lucide-react'
import { useParams } from "react-router-dom";

function CommentsBar() {
  const commentMode = useEditorStore((state) => state.commentMode);
  const updateCommentMode = useEditorStore((state) => state.updateCommentMode);
  const comments = useEditorStore((s) => s.comments);
  const clearTempTags = useEditorStore((s) => s.clearTempTags)
  const showComments = useEditorStore((s) => s.showComments)
  const toggleShowComments = useEditorStore((s) => s.toggleShowComments)
  const scrollDiv = useRef<HTMLDivElement>(null);
  const apiGetComments = useEditorStore((s) => s.apiGetComments)
  const subscribeToComments = useEditorStore((s) => s.subscribeToComments)

  const { id } = useParams();

  useEffect(() => {
    apiGetComments();

    let unsubscribe: any;

    if (id) {
      subscribeToComments(id).then((cleanupFunc) => {
        unsubscribe = cleanupFunc;
      });
    }

    // Cleanup function on component unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [id, apiGetComments]);

  return (
    <div className="flex flex-col w-[320px] h-full">
      <div
        className={`bg-sky-200 bg-opacity-50 border border-sky-200 pointer-events-auto p-2 rounded shadow-level1 transition-all duration-500 ease-in-out w-full ${showComments ? 'flex-1' : 'h-11'} overflow-hidden`}
      >
        <div className="flex gap-8 justify-between items-center mb-2">
          <MessageSquarePlus
            onClick={() => {
              updateCommentMode(true);
              clearTempTags();
            }}
            strokeWidth={1.25}
            className='h-6 w-6  transition-all hover:scale-110' />
          <h2 className='text-sm font-medium'>Comments</h2>
          <ChevronUp
            onClick={() => toggleShowComments()}
            className={`relative h-6 w-6 transition-all ${showComments ? 'rotate-180' : 'rotate-0'} hover:scale-110`}
            strokeWidth={1.25}
          />
        </div>

        <div ref={scrollDiv} className={`w-full hide-scrollbar pb-6 ${showComments ? 'h-full overflow-y-auto' : 'h-0 overflow-hidden'}`}>
          {comments && comments.map((comment) => (
            <Comment key={comment.id} comment={comment} parentRef={scrollDiv} />
          ))}
        </div>
      </div>

      {commentMode && <NewComment />}
    </div>
  );
}

export default CommentsBar;
