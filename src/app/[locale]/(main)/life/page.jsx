import Link from 'next/link';
import { getDictionary } from '@/lib/intl/dictionaries'

import MapContainer from '@/components/maps/historical-map';
import TimeCircle from '@/components/maps/time-circle';

export default async function Preface({ params }) {

  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="m-auto p-4 flex-1 flex gap-4"> 
      <div className="w-2/3">
        <MapContainer />
      </div>
      <div className="w-1/3">
        <TimeCircle />
      </div>
    </div>
  );
}
