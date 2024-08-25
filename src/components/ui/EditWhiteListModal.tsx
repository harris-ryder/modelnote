import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import EmailButton from './EmailButton';
import { Switch } from 'antd';
import { useApiStore } from '../../store/api-store';
import { ViewProjectData } from '../../types';

interface EditWhiteListModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  props: ViewProjectData;
}

const EditWhiteListModal: React.FC<EditWhiteListModalProps> = ({ modalRef, props }) => {

  const { name, id, whitelist } = props;

  const [inputEmail, setInputEmail] = useState<string>('');

  const deleteWhiteListEntry = useApiStore((s) => s.deleteWhiteListEntry);
  const insertWhiteListEntry = useApiStore((s) => s.insertWhiteListEntry);
  const getProjectUpdateUI = useApiStore((s) => s.getProjectUpdateUI);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await addEmail(id);
    }
  };

  const removeEmail = async (whitelistId: string) => {
    try {
      await deleteWhiteListEntry(whitelistId);
      await getProjectUpdateUI(id);
    } catch (err) {
      console.error("Remove Email failed", err);
    }
  };

  const addEmail = async (id: string) => {
    try {
      await insertWhiteListEntry(id, inputEmail);
      await getProjectUpdateUI(id);
      setInputEmail('');
      toast.success("Email added", {
        duration: 500
      });

    } catch (err) {
      console.error("Add Email failed", err);
    }
  };

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

      <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-600 bg-opacity-50 pointer-events-none z-50">
      </div>

      <div
        ref={modalRef}
        className="fixed max-w-[90%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-300 border border-sky-300 pointer-events-auto rounded-md flex-col items-center flex shadow-level1 z-50"
        style={{ width: 'auto' }}
      >
        <div className='p-4'>
          <p className="inline-flex items-center">
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
          <p className='underline'>{name}</p>
        </div>

        <div className="relative w-full">
          {/* Shadows above and below */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable grid with content */}
          <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[200px] p-4 w-full bg-sky-100 no-scrollbar ">
            {whitelist.map((object) => (
              <EmailButton onClick={() => removeEmail(object.id)} key={object.id} size='sm'>{object.email}</EmailButton>
            ))}
          </div>
        </div>

        <div className='w-full p-4'>
          <input
            className='border px-4 border-sky-300 h-10 cursor-text rounded-full no-focus-outline w-[100%]'
            type="text"
            placeholder='someone@gmail.com'
            value={inputEmail}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </>
  );
};

export default EditWhiteListModal;

