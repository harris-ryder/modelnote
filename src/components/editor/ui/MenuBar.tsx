import { useState } from "react";
import ModelTreeTool from "./ModelTreeTool";
import useEditorStore from "../EditorStore";
import PaintTool from "./PaintTool";
import Button from "../../ui/Button";
import { TableProperties, Palette, Pin, Focus, PinOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


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
      <div className="bg-sky-200 p-2 h-full rounded shadow-level1 border border-sky-300 flex flex-col gap-2">
        <Button className='relative group' size="child" onClick={() => navigate('/dashboard')}
        >
          <img src="/logo.svg" className="h-6 w-6" alt="My SVG" />
          <p
            className={`absolute right-0 text-slate-500 translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}
            style={{ right: '-50%' }}
          >
            Dashboard
          </p>

        </Button>
        <hr className={`border-t border-sky-300 w-full`} />

        <Button
          className={`${displayTree ? "bg-sky-300" : ""} relative group`}
          size="child"
          onClick={() => setDisplayTree(!displayTree)}
        >
          <TableProperties strokeWidth={1.25} className="h-6 w-6" />
          <p
            className={`absolute right-0 text-slate-500 translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}
            style={{ right: '-50%' }}
          >
            Scene Models
          </p>
        </Button>

        <Button
          className={`${displayPaint ? "bg-sky-300" : ""} relative group`}
          size="child"
          onClick={() => setDisplayPaint(!displayPaint)}
        >
          <Palette strokeWidth={1.25} className="h-6 w-6" />
          <p
            className={`absolute right-0 text-slate-500 translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}
            style={{ right: '-50%' }}
          >
            Modify Color
          </p>

        </Button>

        <Button
          size="child"
          onClick={() => {
            triggerSpaceKeyDown();
          }}
          className="relative group"
        >
          <Focus strokeWidth={1.25} className="h-6 w-6" />
          <p
            className={`absolute right-0 text-slate-500 translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}
            style={{ right: '-50%' }}
          >
            Center Model (Press Spacebar)
          </p>

        </Button>
        <Button
          className={`relative ${!displayTags && "cross-button"} relative group`}
          size="child"
          onClick={() => {
            toggleDisplayTags();
          }}
        >
          {displayTags && <Pin strokeWidth={1.25} className="h-6 w-6" />}
          {!displayTags && <PinOff strokeWidth={1.25} className="h-6 w-6" />}
          <p
            className={`absolute right-0 text-slate-500 translate-x-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}
            style={{ right: '-50%' }}
          >
            Toggle Tags
          </p>

        </Button>
      </div >

      {displayTree && <ModelTreeTool />
      }
      {displayPaint && <PaintTool />}
    </div >
  );
}

export default MenuBar;
