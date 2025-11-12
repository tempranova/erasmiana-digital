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
    // <div className="m-auto flex-1 mt-8 w-full h-[720px] max-h-[720px] pb-10 bg-no-repeat bg-contain bg-center bg-[url('/assets/main-paper-bg.png')]">
    //   <div className="w-[110vh] m-auto">
    //     <div className="grid grid-cols-1 gap-4 flex-1 text-left">
    //       <div className="text-xl cardo-regular">
    //         {/* <h1 className="im-fell-dw-pica-regular text-4xl mb-4">Letter Map</h1> */}
    //         <LetterMap letters={letterResults} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
            <LetterMap letters={letterResults} />
  );
}
