import { db } from '@/lib/db/kysely'

import LetterMap from '@/components/maps/letter-map'

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
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="max-w-7xl bg-white/90 relative p-8">
          <div className="text-xl cardo-regular">
            <h1 className="im-fell-dw-pica-regular text-4xl mb-4">Letter Map</h1>
          </div>
          <LetterMap letters={letterResults} />
        </div>
      </div>
    </div>
  );
}
