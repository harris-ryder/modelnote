import useEditorStore from '../EditorStore';
import TreeMesh from './TreeMesh';
import TreeGroup from './TreeGroup';

function ModelTreeTool() {
  const { models, viewMode } = useEditorStore();

  return (
    <div className="bg-sky-200 bg-opacity-50 overflow-y-scroll scrollbar-hidden p-2 pr-4 rounded shadow-level2">
      {viewMode &&
        Object.entries(models).map(([key, meshList]) => (
          <TreeGroup key={key} name={key} >
            {meshList.map((mesh, meshIndex) => (
              <TreeMesh key={meshIndex} mesh={mesh} />
            ))}
          </TreeGroup>
        ))}
    </div>
  );
}

export default ModelTreeTool;
