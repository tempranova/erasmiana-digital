import { db } from '@/lib/db/kysely'

import NetworkMap from '@/components/maps/network-map'

export default async function Page() {

  const letterResults = await db
    .selectFrom('Letter')
    .select((eb) => [
      'id',
      'title',
      'alt_title',
      'place_text',
      'author', 'recipient',
      'year', 'month', 'day',
      'origin',
      'destination',
      eb.fn('ST_AsGeoJSON', ['origin_geo']).as('origin_geo'),
      eb.fn('ST_AsGeoJSON', ['destination_geo']).as('destination_geo')
    ])
    .execute()

  return (
    <div className="m-auto flex-1 mt-8 w-full max-w-7xl p-8 rounded-md shadow-lg bg-no-repeat bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] max-h-[80vh] overflow-y-scroll">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular-italic text-2xl mb-4">Network Map</h1>
        </div>
          <NetworkMap letters={letterResults} />
      </div>
  </div>
  );
}
