import useEditorStore from '../EditorStore'
import { Modal } from './Modal'
import MenuBar from './MenuBar'
import CommentsBar from './CommentsBar'
import ShareBar from './ShareBar'

function GUI() {

  const viewMode = useEditorStore((s) => s.viewMode)

  return (
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none'>
      {!viewMode && <Modal />}
      {viewMode &&
        <>

          <MenuBar />

          <div className='fixed top-2 right-2 bottom-2 flex gap-2 items-top'>
            <ShareBar />
            <CommentsBar />
          </div>

        </>
      }
    </div >
  )
}

export default GUI
