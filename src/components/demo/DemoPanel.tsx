import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Bounds,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { ChevronRight } from "lucide-react";
import { DemoBuilding } from "./threejs/DemoBuilding";
import DemoComment from "./DemoComment";

function DemoPanel() {
  const commentsContainer = useRef<HTMLDivElement>(null);

  return (
    <div className="flex fixed top-24 left-2 right-2 bottom-2 gap-2 rounded-md ">
      <Canvas
        className="flex-4 rounded-md border border-sky-200 shadow-level2"
        shadows
        camera={{
          position: [0, 0, 100],
          fov: 45,
          near: 0.01,
          far: 10000,
        }}
      >
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 100, 10]}
          castShadow
        />
        <Bounds fit clip observe margin={1.0} maxDuration={1}>
          <DemoBuilding />
        </Bounds>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -35, 0]}
          opacity={0.5}
          scale={200}
          blur={1.5}
          far={50}
        />
        <OrbitControls
          maxPolarAngle={(1 * Math.PI) / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>

      <div className="relative flex flex-col flex-2 rounded-md bg-sky-100 shadow-level2 p-4 gap-4 border border-sky-200">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Share Models</h1>
          <ul className="flex gap-2">
            <li>Upload CAD</li>
            <li>
              <ChevronRight />
            </li>
            <li>Share Link</li>
            <li>
              <ChevronRight />
            </li>
            <li>Edit & Comment</li>
          </ul>
        </div>

        <div className="relative flex-1 h-full overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-100 to-transparent pointer-events-none"></div>
          <div
            ref={commentsContainer}
            className="h-full overflow-y-auto no-scrollbar"
          >
            <DemoComment
              parent={commentsContainer}
              comment="Welcome to model note! You can add models, edit them and add comments using pins!"
              name="Team"
              date="2:44pm 30 Apr"
              id="1"
              imgNum={2}
            />
            <DemoComment
              parent={commentsContainer}
              comment="You can tag parts of your model you want to highlight and attach them to a comment like this one!"
              name="Team"
              date="4:34pm 14 Apr"
              id="2"
              imgNum={1}
            />
            <DemoComment
              parent={commentsContainer}
              comment="Teams can collaborate real time and communicate effectively e.g. Why is there a sofa here?"
              name="Team"
              date="5:34am 16 Apr"
              id="3"
              imgNum={0}
            />
            <DemoComment
              parent={commentsContainer}
              comment="Still not making sense? Take Google Docs and apply it to 3D design thats ModelNote!"
              name="Team"
              date="1:24pm 3 March"
              id="4"
              imgNum={1}
            />
            <DemoComment
              parent={commentsContainer}
              comment="Pins can be large or small, this one is man-sized."
              name="Team"
              date="2:34pm 9 Jul"
              id="5"
            />
            <DemoComment
              parent={commentsContainer}
              comment="We need more rocks here."
              name="Team"
              date="2:34pm 14 Apr"
              id="6"
            />
            <DemoComment
              parent={commentsContainer}
              comment="How are these curtains suspended?"
              name="Team"
              date="2:34pm 14 Apr"
              id="7"
              imgNum={2}
            />
            <DemoComment
              parent={commentsContainer}
              comment="Theres a huge hole here, where is the water going?? Revise."
              name="Team"
              date="2:34pm 14 Apr"
              id="8"
              className="mb-12"
              imgNum={1}
            />
          </div>
          <div className="absolute right-0 left-0 bottom-0 h-20 bg-gradient-to-t from-sky-100 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}

export default DemoPanel;
