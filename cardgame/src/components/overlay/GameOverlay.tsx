import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/AuthContext';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

export default function GameOverlay() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="fixed right-0 top-0 mr-5 mt-5">
        <div className="flex flex-row center p-2">
          <p className="self-center px-3">{user?.username}</p>
          <img src={user?.profileImg} className="h-16 w-16 rounded-full"></img>
        </div>
        <div className="flex flex-col items-end p-2">
          <div className=" w-16 flex flex-col justify-items-center">
            <img src={user?.profileImg} className="h-12 w-12 rounded-full self-center"/>
            <img src={user?.profileImg} className="h-12 w-12 rounded-full self-center"/>

            <img src={user?.profileImg} className="h-12 w-12 rounded-full self-center"/>
            <img src={user?.profileImg} className="h-12 w-12 rounded-full self-center"/>
          </div>
        </div>
      </div>
            <button className="bg-red-500 rounded-full text-xl h-12 w-12 self-center right-0 bottom-0 fixed m-5 hover:cursor-pointer hover:bg-red-600" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
    </div>
  );
}
