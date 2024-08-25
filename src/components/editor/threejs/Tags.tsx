import useEditorStore from '../EditorStore'
import Pin from './Pin'

export default function Tags() {
  const tempTags = useEditorStore((s) => s.tempTags)
  const commentMode = useEditorStore((s) => s.commentMode)
  const comments = useEditorStore((s) => s.comments)
  const displayTags = useEditorStore((s) => s.displayTags)

  return (
    <>
      {displayTags && (
        <>
          {commentMode && tempTags.map((tag, index) => (
            <Pin key={index} position={tag.position} scale={tag.scale} targetNormal={tag.targetNormal} />
          ))}

          {!commentMode && comments.map((comment, index) => (
            comment.tags.map((tag, count) => (
              <Pin key={`${index}-${count}`} position={tag.position} scale={tag.scale} targetNormal={tag.targetNormal} color={"lightgray"} commentUUID={comment.id} />
            ))
          ))}
        </>
      )}
    </>
  )
}
