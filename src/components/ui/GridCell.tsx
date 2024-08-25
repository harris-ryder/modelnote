import { FC, useEffect, useRef, useState } from "react";
import { ViewProjectData } from "../../types";
import { useApiStore } from "../../store/api-store";
import toast, { Toaster } from "react-hot-toast";
import { Switch } from "antd";
import { ArrowUpRight, Command } from "lucide-react";
import Button from "./Button";
import EditWhiteListModal from "./EditWhiteListModal";
import { EllipsisVertical } from 'lucide-react';

const GridCell: FC<ViewProjectData> = (props) => {

  const { name, id, is_public, is_owner, whitelist, thumbnail_url, url } = props

  const [isPublic, setIsPublic] = useState(is_public);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [modalOn, setModalOn] = useState(false)
  const [settingsModalOn, setSettingsModalOn] = useState(false)
  const updateProjectPrivacy = useApiStore((s) => s.updateProjectPrivacy)
  const getProjectUpdateUI = useApiStore((s) => s.getProjectUpdateUI)
  const deleteBookmarkEntry = useApiStore((s) => s.deleteBookmarkEntry)
  const getSignedThumbnailUrl = useApiStore((s) => s.getSignedThumbnailUrl)
  const deleteProject = useApiStore((s) => s.deleteProject)
  const modalRef = useRef<HTMLDivElement | null>(null);

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
        containerStyle={{
          zIndex: '9999 !important'
        }}
        toastOptions={{
          style: {
            boxShadow: 'none',
            background: '#fff',
            color: '#000',
            zIndex: '9999 !important', // Corrected from 'z- index' to 'zIndex'
          },
        }}
      />


      <div className="relative flex flex-col gap-2 justify-start max-w-[500px] h-[300px] bg-sky-100 p-2 border border-sky-200 rounded">

        <div className="flex justify-between items-center p-0 m-0">
          <div className="group relative flex-1 min-w-0 flex items-center" >
            <p
              onClick={() => window.open(`/editor/${id}`, '_blank')}
              className="relative truncate cursor-pointer"
            >
              {name}
            </p>
            <ArrowUpRight
              className="relative top-[-3px] w-4 h-4 group-hover:translate-y-[-20%] transition-transform duration-300"
            />
          </div>
          <EllipsisVertical
            onClick={() => setSettingsModalOn(!settingsModalOn)}
            className="w-4 h-4 hover:scale-125 transition-transform duration-300 active:scale-95"
          />
        </div>

        <div className="inline-block">
          <Switch
            size="default"
            checked={isPublic}
            onChange={handleSwitchChange}
            checkedChildren="Anyone with link"
            unCheckedChildren="Invite only"
          />
        </div>

        <div className="relative flex-1 group border border-sky-200 rounded overflow-hidden">
          <img
            src={signedUrl ? signedUrl : './placeholder.svg'}
            className="w-full h-full object-cover"
          />

          <div className={`absolute group-hover:opacity-0 left-0 right-0 bottom-0 h-1/2 bg-opacity-10 bg-gradient-to-t ${is_owner ? 'from-slate-300' : 'from-pink-200'} to-transparent z-1 rounded`}> </div>
          {!isPublic && whitelist.length > 0 && (
            <Button
              className='absolute left-2 bottom-2'
              onClick={linkToClipboard}
              size='xs'
            >
              Copy Link<Command className='ml-2 w-3 h-3' />
            </Button>
          )}
        </div>


        {is_owner ? (
          <div className={`flex flex-col ${!is_public ? 'gap-2' : ''} z-10`}>

            {(is_public) && (
              <div className='text-xs'>
                <Button onClick={linkToClipboard} size='xs'>Copy Link<Command className='ml-2 w-3 h-3' /></Button> {`${is_public ? 'anyone can access!' : 'only the following can access...'}`}
              </div>



            )}
            <div className='flex items-center'>

              {!is_public &&
                (
                  <div className="flex-1 flex gap-2 overflow-x-auto fade-effect no-scrollbar pl-2">
                    {whitelist && whitelist.length > 0 && whitelist.map((object) => (
                      <div key={object.id} className='text-xs inline-flex items-center rounded-full h-6 px-2 bg-pink-200 border border-pink-100'>{object.email}</div>
                    ))
                    }
                  </div>

                )}
              {!is_public && <Button onClick={() => setModalOn(true)} size='xs' variant={'light'}>{whitelist.length > 0 ? 'Edit' : 'Add Emails'}</Button>}
            </div>
          </div>
        ) : (
          <div className='relative text-xs pb-2'>This project has been shared with you <a onClick={() => deleteBookmarkEntry(id)} className='underline'>remove bookmark?</a></div>
        )}


        {settingsModalOn && (

          <div className='absolute top-2 right-8 border rounded border-sky-200 bg-white pl-2 pr-8 py-2 flex flex-col gap-2'>
            <Button onClick={handleDeleteProject} size='xs' >Delete</Button>
            <Button onClick={linkToClipboard} size='xs'>Copy Link</Button>
          </div>

        )}

      </div >

      {modalOn && <EditWhiteListModal props={props} modalRef={modalRef} />
      }





    </>
  )
}





export default GridCell;


