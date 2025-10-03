import Link from 'next/link'

import MapContainer from '@/components/map/map-container';
import HistoricalMap from '@/components/map/historical-map';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex align-center items-center">
        <img src="/assets/erasmus-logo.png" className="w-16 h-16" />
        <div>
          <p className="text-2xl ml-4">Erasmus of Rotterdam</p>
          <p className="text-sm ml-4">The whole world is my homeland.</p>
        </div>
        <div className="flex flex-1 justify-end">
          <Link prefetch={false} href="/search" className="ml-4">Search</Link>
          <Link prefetch={false} href="/about" className="ml-4">About</Link>
        </div>
      </div>
      <div className="w-full flex flex-col flex-1">
        <HistoricalMap />
      </div>
    </div>
  );
}
        // <MapContainer />
