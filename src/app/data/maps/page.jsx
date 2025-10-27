import { db } from '@/lib/db/kysely'

import LetterMap from '@/components/maps/letter-map'

export default async function Page() {

  const results = await db
    .selectFrom('Metadata')
    .select((eb) => [
      'placename',
      eb.fn('ST_AsGeoJSON', ['geometry']).as('geometry'),
      eb.fn.countAll().as('count'),
    ])
    .groupBy('placename')
    .groupBy('geometry')
    .execute()

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay">
      <LetterMap letter_points={results} />
    </div>
  );
}
