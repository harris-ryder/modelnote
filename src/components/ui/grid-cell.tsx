import { FC, useEffect, useRef, useState } from "react";
import { ViewProjectData } from "../../types";
import { useApiStore } from "../../store/api-store";
import toast, { Toaster } from "react-hot-toast";
import EditWhiteListModal from "./EditWhiteListModal";
import Button from './standard-button';
import IconButton from './icon-button';
import ToggleSwitch from './custom-toggle';

const GridCell: FC<ViewProjectData> = (props) => {

  const { name, id, is_public, is_owner, thumbnail_url, url } = props


  const [isPublic, setIsPublic] = useState(is_public);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [modalOn, setModalOn] = useState(false)
  const updateProjectPrivacy = useApiStore((s) => s.updateProjectPrivacy)
  const getProjectUpdateUI = useApiStore((s) => s.getProjectUpdateUI)
  const getSignedThumbnailUrl = useApiStore((s) => s.getSignedThumbnailUrl)
  const deleteProject = useApiStore((s) => s.deleteProject)
  const deleteBookmarkEntry = useApiStore((s) => s.deleteBookmarkEntry)
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [displaySettings, setDisplaySettings] = useState(false)


  const handleDeleteProject = async () => {
    if (!is_owner) return
    try {
      await deleteProject(id, url, thumbnail_url)
      toast.success("Project Deleted", {
        duration: 500
      });
    } catch (err) {
      toast.error("There was a problem deleting", {
        duration: 500
      });
    }
  }


  const linkToClipboard = () => {
    const url = `${window.location.origin}/editor/${id}`;

    try {
      navigator.clipboard.writeText(url)
      toast.success("Copied to clipboard!", {
        duration: 500
      });

    } catch (err) {
      console.error('Failed to copy')
    }
  };

  const handleSwitchChange = async (checked: boolean) => {
    if (!is_owner) return
    try {
      console.log("We trying!")
      setIsPublic(checked)
      await updateProjectPrivacy(id, checked)
      toast.success("Privacy Updated", {
        duration: 500
      });
      getProjectUpdateUI(id)
    } catch (err) {
      toast.error("There was a problem", {
        duration: 500
      });

    }
  };


  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (event: MouseEvent) => {
      // Ensure modalRef is not null and the target is an HTMLElement
      if (modalRef.current && event.target instanceof HTMLElement && !modalRef.current.contains(event.target)) {
        setModalOn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (thumbnail_url) {
      const fetchUrl = async () => {
        const url = await getSignedThumbnailUrl(thumbnail_url);
        setSignedUrl(url);
      };
      fetchUrl();
    }
  }, [thumbnail_url, getSignedThumbnailUrl]);




  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            boxShadow: 'none',
            background: '#fff',
            color: '#000',
          },
        }}
      />

      <div className="flex flex-col relative p-2 max-w-[500px] h-[300px] bg-sky-200 bg-opacity-50 border border-sky-200 rounded-md hover:transform hover:translate-y-[-2px] hover:shadow-level2 transition-all duration-200">
        <div className='flex items-center'>
          <h1 onClick={() => window.open(`/editor/${id}`, '_blank')} className='font-bold flex-1 cursor-pointer'>{name}</h1>
          <IconButton onClick={() => { setDisplaySettings(!displaySettings) }} icon='EllipsisVertical' size='sm' variant='ghost' />
        </div>

        {displaySettings && is_owner && (
          <div className={`flex gap-2 py-2 transition-all duration-200 ease-out ${displaySettings ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Button onClick={handleDeleteProject} className='flex-1' variant='danger' size='sm'>Delete</Button>
            <Button onClick={() => setModalOn(true)} className='flex-1' variant='default' size='sm'>Invite List</Button>
          </div>
        )}

        {displaySettings && !is_owner && (
          <div className={`flex gap-2 py-2 transition-all duration-200 ease-out ${displaySettings ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Button onClick={() => deleteBookmarkEntry(id)} className='flex-1' variant='danger' size='sm'>Remove bookmark?</Button>
          </div>
        )}


        <div className='relative flex-1 group'>
          <div className='absolute pointer-events-auto flex flex-col justify-between left-0 top-0 right-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
            <IconButton onClick={linkToClipboard} className='relative group/btn' icon='Copy' size='md' variant='ghost'><p className='absolute opacity-0 group-hover/btn:opacity-80 right-0 translate-x-full text-xs text-slate-700 whitespace-nowrap'>Share link</p></IconButton >
            {is_owner && <ToggleSwitch onClick={() => handleSwitchChange(!isPublic)} className='' leftLabel='Anyone' rightLabel='Invite only' isChecked={isPublic} size='sm' ></ToggleSwitch>}

          </div>

          <div className="absolute p-2 left-0 right-0 top-0 bottom-0 pointer-events-none opacity-100 group-hover:opacity-0 flex flex-col justify-end transition-opacity duration-500">
            <div>
              {!is_owner && !is_public && <Button size='xs' variant='pink'>shared with you</Button>}
              {!is_owner && is_public && <Button size='xs' variant='green'>public</Button>}
              {is_owner && !is_public && <Button size='xs'>Invite only</Button>}
              {is_owner && is_public && <Button size='xs' variant='green'>public - anyone can access</Button>}
            </div>
          </div>


          <img
            src={signedUrl ? signedUrl : './placeholder.png'}
            className='w-full h-full object-cover rounded-md'
          />
        </div>

      </div >
      {modalOn && <EditWhiteListModal props={props} modalRef={modalRef} />}
    </>
  );
};

export default GridCell;

