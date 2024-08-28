import { useState } from "react";
import ModelTreeTool from "./ModelTreeTool";
import useEditorStore from "../EditorStore";
import PaintTool from "./PaintTool";
import { useNavigate } from "react-router-dom";
import IconButton from "../../ui/icon-button";


function MenuBar() {
  const [displayTree, setDisplayTree] = useState(false);
  const [displayPaint, setDisplayPaint] = useState(false);
  const displayTags = useEditorStore((s) => s.displayTags);
  const toggleDisplayTags = useEditorStore((s) => s.toggleDisplayTags);

  const navigate = useNavigate();

  const triggerSpaceKeyDown = () => {
    const event = new KeyboardEvent("keydown", { key: " ", code: "Space" });
    window.dispatchEvent(event);
  };


  return (
    <div className="fixed top-2 left-2 bottom-2 pointer-events-auto flex gap-2 ">
      <div className="bg-sky-200 p-2 h-full rounded shadow-level1 border border-sky-300 flex flex-col gap-2 ">
        <button
          className="h-14 w-14 inline-flex items-center justify-center hover:bg-sky-300 rounded-md"
          onClick={() => navigate('/dashboard')}
        >
          <img src="/logo.svg" className="h-6 w-6" alt="My SVG" />

        </button>

        <hr className={`border-t border-sky-300 w-full`} />

        <IconButton onClick={() => setDisplayTree(!displayTree)} className={`${displayTree ? "bg-sky-300" : ""} relative group`} icon='TableProperties' variant='light' hoverText='Scene Models' size='lg' />
        <IconButton onClick={() => setDisplayPaint(!displayPaint)} className={`${displayPaint ? "bg-sky-300" : ""} relative group`} icon='Palette' variant='light' hoverText='Modify Color' size='lg' />
        <IconButton onClick={() => { triggerSpaceKeyDown() }} icon='Focus' variant='light' hoverText='Center Model (Spacebar)' size='lg' />
        <IconButton onClick={() => { toggleDisplayTags() }} icon={`${displayTags ? 'Pin' : 'PinOff'}`} variant='light' hoverText='Show/Hide pins' size='lg' />

      </div >

      {displayTree && <ModelTreeTool />
      }
      {displayPaint && <PaintTool />}
    </div >
  );
}

export default MenuBar;
