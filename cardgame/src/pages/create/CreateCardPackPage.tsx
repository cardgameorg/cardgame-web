import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../components/Logo';
import NavigateButton from '../../components/template/NavigateButton';
import { faAlignJustify, faBackward, faSimCard, faTicketSimple } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function CreateCardPackPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <div className="w-full h-full p-2 gap-1 sm:gap-4 sm:p-12 flex flex-col items-center justify-center transition-all overflow-y-scroll no-scrollbar">
      <NavigateButton to="/discover/home" className=" m-12 bg-highlight-secondary rounded-2xl py-2 px-4 fixed top-0 left-0 hover:opacity-50 cursor-pointer">
        <FontAwesomeIcon icon={faBackward}  /> Back
      </NavigateButton>
      <div className="bg-secondary-bg p-12 flex flex-col justify-center items-center  gap-6 rounded-3xl max-w-full self-center">
        <div className="flex flex-row items-center justify-center gap-4">
          <FontAwesomeIcon icon={faSimCard} size="4x" />
          <h1 className="text-3xl font-black text-center">Create your own card pack</h1>
        </div>
        <p>Edit the card to start.</p>
        <div className="flex flex-col p-4 bg-primary-bg rounded-3xl max-w-64 h-86 shadow-center shadow-[#121212]">
          <textarea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            maxLength={40}
            spellCheck="false"
            className="font-bold text-xl rounded-xl p-4  outline-0 max-h-64 resize-none overflow-hidden "
            placeholder="The title of your pack."
          ></textarea>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            maxLength={64}
            spellCheck="false"
            className="text-secondary-text rounded-xl p-4  outline-0 h-48 resize-none overflow-y-scroll no-scrollbar"
            placeholder="Short description about the pack."
          ></textarea>
          <div className="flex flex-row mt-auto justify-between">
            <p>Author:</p>
            <button className="hover:font-bold cursor-pointer active:opacity-50 transition-all">
              @{user?.username}
            </button>
          </div>
        </div>
        
        <button className={`shadow-center shadow-highlight h-16 py-4 px-12 bg-highlight rounded-2xl transition-all cursor-pointer hover:opacity-50 text-2xl ${title.length >= 4 && description.length >= 4 ? " " : " opacity-0 "} `}>
            Create
          </button>
      </div>
    </div>
  );
}

