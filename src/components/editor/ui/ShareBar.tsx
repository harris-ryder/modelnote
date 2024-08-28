import React, { useState } from 'react';
import Button from '../../ui/standard-button';
import { X } from 'lucide-react';
import { Switch } from 'antd';
import useEditorStore from '../EditorStore';
import EmailButton from '../../ui/EmailButton';
import toast, { Toaster } from "react-hot-toast";

const ShareBar: React.FC = () => {
  const [shareTool, setShareTool] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState(false);
  const [inputEmail, setInputEmail] = useState<string>('');

  const projectData = useEditorStore((s) => s.projectData)
  const updateProjectPrivacy = useEditorStore((s) => s.updateProjectPrivacy)
  const insertWhiteListEntry = useEditorStore((s) => s.insertWhiteListEntry);
  const deleteWhiteListEntry = useEditorStore((s) => s.deleteWhiteListEntry);

  const handleSwitchChange = async (checked: boolean) => {
    if (!projectData) return;
    if (!projectData.is_owner) return;
    try {
      setIsPublic(checked);
      await updateProjectPrivacy(projectData.id, checked);
      toast.success("Privacy Updated", {
        duration: 500
      });
    } catch (err) {
      toast.error("There was a problem", {
        duration: 500
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && projectData) {
      await addEmail(projectData.id);
    }
  };

  const removeEmail = async (whitelistId: string) => {
    try {
      await deleteWhiteListEntry(whitelistId);
      toast.success("Email removed", {
        duration: 500
      });
    } catch (err) {
      console.error("Remove Email failed", err);
    }
  };

  const addEmail = async (id: string) => {
    try {
      await insertWhiteListEntry(id, inputEmail);
      setInputEmail('');
      toast.success("Email added", {
        duration: 500
      });
    } catch (err) {
      console.error("Add Email failed", err);
    }
  };


  const linkToClipboard = () => {
    if (!projectData) return
    const url = `${window.location.origin}/editor/${projectData.id}`;

    try {
      navigator.clipboard.writeText(url)
      console.log("Success")
      toast.success("Copied to clipboard!", {
        duration: 500
      });

    } catch (err) {
      console.error('Failed to copy')
    }
  };


  if (!projectData?.is_owner) {
    return (
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              boxShadow: 'none',
              background: '#fff',
              color: '#000',
            },
          }}
        />
        {shareTool ? (
          <div>
            <div className="flex flex-col gap-2 justify-between items-center min-w-64 bg-sky-200 bg-opacity-50 border border-sky-200 pointer-events-auto p-2 rounded shadow-level1 transition-all">
              <div className="flex gap-6 justify-between items-center w-full">
                <X onClick={() => setShareTool(false)} className="w-6 h-6 cursor-pointer hover:scale-110" />
                <Switch
                  size="default"
                  checked={isPublic}
                  onChange={handleSwitchChange}
                  checkedChildren="Anyone with link"
                  unCheckedChildren="Invite only"
                />
              </div>

              <Button
                variant='default'
                size="lg"
                className="w-full"
                onClick={linkToClipboard}>
                Copy Link
              </Button>
            </div>
          </div >
        ) : (
          <Button onClick={() => setShareTool(true)} size='lg' variant="light" icon='UserRoundPlus' className="shadow-level1 px-8 pointer-events-auto">
            Share
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            boxShadow: 'none',
            background: '#fff',
            color: '#000',
          },
        }}
      />
      {shareTool ? (
        <div>
          <div className="flex flex-col gap-2 justify-between items-center min-w-64 bg-sky-200 bg-opacity-50 border border-sky-200 pointer-events-auto p-2 rounded shadow-level1 transition-all">
            <div className="flex gap-6 justify-between items-center w-full">
              <X onClick={() => setShareTool(false)} className="w-6 h-6 cursor-pointer hover:scale-110" />
              <Switch
                size="default"
                checked={isPublic}
                onChange={handleSwitchChange}
                checkedChildren="Anyone with link"
                unCheckedChildren="Invite only"
              />
            </div>

            <Button
              variant='default'
              size="sm" className="w-full"
              onClick={linkToClipboard}>
              Copy Link
            </Button>

            {isPublic ? (
              <p className="inline-flex items-center text-xs text-wrap mb-2">
                When{' '}
                <Switch
                  size="default"
                  checked={true}
                  checkedChildren="Anyone can access"
                  unCheckedChildren="Invite only"
                  className="mx-2"
                />
                anyone with link can access
              </p>
            ) : (
              <p className="inline-flex items-center text-xs text-wrap mb-2">
                When{' '}
                <Switch
                  size="default"
                  checked={false}
                  checkedChildren="Anyone can access"
                  unCheckedChildren="Invite only"
                  className="mx-2"
                />
                only the following can access
              </p>
            )}

            {!isPublic && (
              <>
                <div className='w-full'>
                  <hr className={`border-t border-sky-400 w-full`} />
                  {projectData && projectData.whitelist.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[200px] w-full no-scrollbar py-2 ">
                      {projectData.whitelist.map((object) => (
                        <EmailButton onClick={() => removeEmail(object.id)} key={object.id} size='sm'>{object.email}</EmailButton>
                      ))}
                    </div>
                  )}
                  <hr className={`border-t border-sky-400 w-full`} />
                </div>
                <input
                  className='border px-4 border-sky-300 h-10 cursor-text rounded-md no-focus-outline w-[100%]'
                  type="text"
                  placeholder='someone@gmail.com'
                  value={inputEmail}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <Button onClick={() => setShareTool(true)} size='lg' icon='UserRoundPlus' variant="light" className="shadow-level1 px-8 pointer-events-auto">
          Share
        </Button>
      )}
    </>
  );
};

export default ShareBar;

