import { db } from '@/lib/db/kysely'

import LetterMap from '@/components/maps/letter-map'

export default async function Page() {

  const results = await db
    .selectFrom('Letter')
    .select((eb) => [
      'placename',
      eb.fn('ST_AsGeoJSON', ['geometry']).as('geometry'),
      eb.fn.countAll().as('count'),
    ])
    .groupBy('placename')
    .groupBy('geometry')
    .execute()

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="max-w-7xl bg-white/90 relative p-8">
          <div className="text-xl cardo-regular">
            <h1 className="im-fell-dw-pica-regular text-4xl mb-4">About Erasmiana.org</h1>
          </div>
          <p className="cardo-regular text-xl">Some information, coming soon, about this project and what it's trying to do. We are still very much in a beta phase!</p>
        </div>
      </div>
    </div>
  );
}
