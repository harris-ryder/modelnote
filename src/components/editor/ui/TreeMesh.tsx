import { FC } from 'react'
import useEditorStore from '../EditorStore'
import { MeshData } from '../../../types';


interface TreeMeshProps {
  mesh: MeshData;
}

const TreeMesh: FC<TreeMeshProps> = ({ mesh }) => {

  const selected = useEditorStore((s) => s.selected);
  const updateSelected = useEditorStore((s) => s.updateSelected)

  const hideList = useEditorStore((s) => s.hideList)
  const updateHideList = useEditorStore((s) => s.updateHideList)


  function toggleVisible() {
    updateHideList(mesh.uuid)
  }

  return (

    <div className='flex items-center justify-between gap-2'>
      <p onClick={() => updateSelected(mesh.uuid)} className={`ml-2 whitespace-nowrap ${mesh.uuid === selected ? 'font-bold' : ''}`}>
        {mesh.name ? mesh.name : "mesh"}
      </p>
      <button
        onClick={toggleVisible}
        className={` relative w-4 h-4 rounded-full border-2 border-blue-400 ${!hideList.includes(mesh.uuid) && `btn-visible`}`}></button>
    </div >

  )
}

export default TreeMesh
