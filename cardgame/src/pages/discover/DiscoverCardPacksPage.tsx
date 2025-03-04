import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSimCard } from '@fortawesome/free-solid-svg-icons/faSimCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PackCard from '../../components/template/PackCard';

export default function DiscoverCardPacksPage() {
  const [cards, setCards] = useState<string[]>(['1', '2']);
  const [cardCount, setCardCount] = useState<number>(2456);

  return (
    <div className="h-full w-full text-primary-text backdrop-blur-2xl overflow-y-scroll">
      <header className="flex flex-col p-2 sm:p-12 gap-6">
        <div className="w-full flex flex-row gap-6">
          <FontAwesomeIcon icon={faSimCard} size="2x" className="self-center" />
          <h1 className="text-2xl font-black self-center">Discover card packs</h1>
          <FontAwesomeIcon icon={faSearch} size="2x" className="self-center ml-auto" />
        </div>
        <p className="text-xl pl-2 text-secondary-text">
          Browse from our vast collection of <b className="text-main-text">{cardCount}</b> Card Packs made by the
          developers or the community.
        </p>
      </header>
      <main className=" sm:p-12 pt-0 gap-6 w-full flex flex-col">
        <section className="flex flex-col gap-6">
          <div>
            <button className="hover:opacity-75 cursor-pointer active:opacity-50 transition-all text-main-text font-bold bg-highlight shadow-md shadow-highlight rounded-3xl px-3 py-1 ">
              featured
            </button>
          </div>
          <div className="p-4 rounded-xl">
            <section className="p-6 pb-6 flex flex-row gap-6 overflow-x-scroll small-scrollbar ">
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="oaglgpgiua awepughpoarguh apeirughperiguhaerpgiu jo leiras fasz fiszfasz" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim hosszu cim jaj nagyon hosszu aaaaaaaaa aaaaaaaaaaa aaaaaaaaa" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-secondary hover:shadow-[#aaa]' />
            </section>
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div>
            <button className="hover:opacity-75 cursor-pointer active:opacity-50 transition-all text-main-text font-bold bg-highlight-toprated shadow-md shadow-highlight-toprated rounded-3xl px-3 py-1 ">
              top packs
            </button>
          </div>
          <div className="p-4 rounded-xl">
            <section className="p-6 pb-6 flex flex-row gap-6 overflow-x-scroll small-scrollbar ">
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-toprated hover:shadow-[#aaa]' />
            </section>
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div>
            <button className="hover:opacity-75 cursor-pointer active:opacity-50 transition-all text-main-text font-bold bg-highlight-family-friendly shadow-md shadow-highlight-family-friendly rounded-3xl px-3 py-1 ">
              family friendly
            </button>
          </div>
          <div className="p-4 rounded-xl">
            <section className="p-6 pb-6 flex flex-row gap-6 overflow-x-scroll small-scrollbar">
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-family-friendly hover:shadow-[#aaa]' />
              <PackCard title="cim" description="getCim" author="fütyi" className='shadow-highlight-family-friendly hover:shadow-[#aaa]' />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
