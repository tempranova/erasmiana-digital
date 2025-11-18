import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';

import LetterIndex from '@/components/letter/letter-index';

export default async function Page({ searchParams }) {

  let { page, search, orderBy } = searchParams;
  if(!page) {
    page = 1;
  } else {
    page = parseInt(page)
  }
  const itemsPerPage = 50;

  let baseQuery = db.selectFrom('Letter');

  if(search && search !== "") {
    baseQuery = baseQuery.where((eb) =>
      eb.or([
        eb('title', 'ilike', `%${search}%`),
        eb('alt_title', 'ilike', `%${search}%`),
        eb('reference', 'ilike', `%${search}%`),
        eb('date_text', 'ilike', `%${search}%`),
        eb('origin', 'ilike', `%${search}%`),
        eb('destination', 'ilike', `%${search}%`),
        eb(sql`lower(cast("year" as text))`, 'like', `%${search}%`)
      ])
    );
  }
    

  let allLettersQuery = baseQuery
    .select([
      'id','title','alt_title','reference','date_text',
      'origin','destination','place_text','volume','related_to','year'
    ])
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
    
  if(orderBy && orderBy !== "" && orderBy.indexOf('-') > -1) {
    const sort = orderBy.split('-')[0]
    const order = orderBy.split('-')[1]
    allLettersQuery = allLettersQuery.orderBy(sort, order)
  } else {
    allLettersQuery = allLettersQuery.orderBy('year');
  }

  const allLetters = await allLettersQuery.execute();;

  const allLettersCount = await baseQuery
    .select((eb) => [eb.fn.countAll().as('totalCount')])
    .executeTakeFirst();

  return (
    <div id="scroll-container" className="my-4 mx-4 lg:my-auto lg:mx-0 lg:-ml-[20px] w-full max-w-7xl rounded-lg shadow-lg lg:h-[90vh] p-8 bg-repeat lg:bg-no-repeat lg:bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] overflow-y-auto outline-none">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-center text-3xl mb-4">Letters & Correspondence</h1>
        </div>

        <div className="w-full m-auto max-w-7xl pb-16">
          <LetterIndex 
            page={page} 
            allLetters={allLetters} 
            totalCount={parseInt(allLettersCount.totalCount)} 
            itemsPerPage={itemsPerPage} 
            search={search}
            orderBy={orderBy}
          />
        </div>
      </div>
    </div>
  );
}
