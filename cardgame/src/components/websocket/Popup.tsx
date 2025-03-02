import React, { useEffect, useState } from 'react';
import { usePopups } from '../../contexts/PopupContext';
interface PopupProps {
  message: string;
  id: number;
  onTimeout: (id: number) => void;
}

const Popup: React.FC<PopupProps> = ({ message, id, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0.1) {
          setIsVisible(false);
          onTimeout(id);
          return 0;
        }
        return prevTime - 0.1;
      });
    }, 100);

    setTimeLeft((prevTime) => prevTime - 0.1);

    return () => clearInterval(interval);
  }, [id, onTimeout]);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => onTimeout(id), 300);
    }
  }, [isVisible, id, onTimeout]);

  return (
    <div
      className={`p-5 m-2 gradientbg w-6xl self-center rounded-3xl shadow-2xl  ${
        isVisible ? ' fade-in' : ' fade-out'
      } `}
    >
      <div className="text-white py-2 text-sm">{message}</div>
      <div className="popup-progress">
        <div className="popup-progress-bar" style={{ width: `${(timeLeft / 3) * 100}%` }}></div>
      </div>
    </div>
  );
};

interface PopupListProps {
  popups: { message: string; id: number }[];
  removePopup: (id: number) => void;
}

const PopupList: React.FC<PopupListProps> = ({ popups, removePopup }) => {
  return (
    <div className="fixed max-h-2/5 w-screen flex flex-col z-50">
      {popups.slice(0,3).map((popup) => (
        <Popup key={popup.id} id={popup.id} message={popup.message} onTimeout={removePopup} />
      ))}
    </div>
  );
};

export const PopupListWrapper: React.FC = () => {
  const { popups, removePopup } = usePopups();

  return <PopupList popups={popups} removePopup={removePopup} />;
};

export default PopupList;
