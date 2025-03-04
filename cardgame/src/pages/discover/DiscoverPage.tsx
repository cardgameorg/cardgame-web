import { matchPath, useParams } from 'react-router';
import DiscoverNav, { DiscoverNavProps } from '../../components/discover/DiscoverNav';
import DiscoverCardPacksPage from './DiscoverCardPacksPage';

export default function DiscoverPage() {
  const { path } = useParams();



  return (
    <div className="w-full h-full flex md:flex-row flex-col">
      <DiscoverNav path={path} />
      <div className="basis-10/12 bg-[#11111199] overflow-y-scroll no-scrollbar">
      {
        {
          'cardpacks': <DiscoverCardPacksPage/>,
          'promptpacks': "pocs",
          'guide': "guide page here"
        }[path!]
      }
      </div>
    </div>
  );
}
