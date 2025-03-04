import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../Logo';
import { faAdd, faIdCardClip, faQuestionCircle, faSdCard, faSimCard } from '@fortawesome/free-solid-svg-icons';
import NavigateButton from '../template/NavigateButton';

export interface DiscoverNavProps {
  path: string | undefined;
}

export default function DiscoverNav({ path }: DiscoverNavProps) {
  return (
    <nav className="bg-primary-bg p-6 flex basis-2/12 justify-between flex-col sm:flex-col gap-6">
      <div className="sm:w-full flex flex-col">
        <NavigateButton to="/discover/home">
          <Logo
            className={`hidden sm:block px-4 transition-all hover:cursor-pointer active:opacity-80    ${
              path == 'home' ? 'drop-shadow-logo' : ''
            }`}
          ></Logo>
        </NavigateButton>
        <div className="overflow-y-scroll flex sm:flex-col flex-row no-scrollbar gap-6">
          <NavigateButton
            to="/discover/cardpacks"
            className={`transition-all hover:text-highlight-secondary active:opacity-50 cursor-pointer text-xl flex items-center gap-6  ${
              path == 'cardpacks' ? 'text-highlight' : ''
            }`}
          >
            <FontAwesomeIcon className="sm:hidden" icon={faSimCard} size="2x" />
            <p className="sm:text-2xl text-sm truncate">Card Packs</p>
          </NavigateButton>
          <NavigateButton
            to="/discover/promptpacks"
            className={`transition-all hover:text-highlight-secondary active:opacity-50 cursor-pointer text-xl flex items-center gap-6  ${
              path == 'promptpacks' ? 'text-highlight' : ''
            }`}
          >
            <FontAwesomeIcon className="sm:hidden" icon={faSdCard} size="2x" />
            <p className="sm:text-2xl text-sm truncate">Prompt Packs</p>
          </NavigateButton>
        </div>
      </div>
      <div className="sm:w-full flex flex-wrap flex-row sm:flex-col">
        <div className=" flex flex-col  gap-6">
          <NavigateButton
            to="/create"
            className={`transition-all hover:text-highlight-secondary active:opacity-50 cursor-pointer text-xl flex items-center gap-6  ${
              path == 'create' ? 'text-highlight' : ''
            }`}
          >
            <FontAwesomeIcon className="sm:hidden" icon={faAdd} size="2x" />
            <p className="sm:text-2xl text-sm truncate">Create</p>
          </NavigateButton>
          <NavigateButton
            to="/discover/guide"
            className={`transition-all hover:text-highlight-secondary active:opacity-50 cursor-pointer text-xl flex items-center gap-6  ${
              path == 'guide' ? 'text-highlight' : ''
            }`}
          >
            <FontAwesomeIcon className="sm:hidden" icon={faQuestionCircle} size="2x" />
            <p className="sm:text-2xl text-sm truncate">Guide</p>
          </NavigateButton>
          <NavigateButton
            to="/game"
            className="  transition-all sm:p-8 p-2 text-2xl rounded-2xl bg-highlight highlightshadow lg:w-full hover:opacity-50 hover:cursor-pointer active:opacity-75"
          >
            Play
          </NavigateButton>
        </div>
      </div>
    </nav>
  );
}
