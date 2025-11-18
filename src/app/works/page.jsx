import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';

import WorkIndex from '@/components/work/work-index';

export default async function Page({ searchParams }) {

  let { page, search, orderBy } = searchParams;
  if(!page) {
    page = 1;
  } else {
    page = parseInt(page)
  }
  const itemsPerPage = 20;

  let baseQuery = db.selectFrom('Work');

  if(search && search !== "") {
    baseQuery = baseQuery.where((eb) =>
      eb.or([
        eb('title', 'ilike', `%${search}%`),
        eb(sql`lower(cast("year" as text))`, 'like', `%${search}%`)
      ])
    );
  }
    

  let allWorksQuery = baseQuery
    .select([
      'id','title','blurb','year'
    ])
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
    
  if(orderBy && orderBy !== "" && orderBy.indexOf('-') > -1) {
    const sort = orderBy.split('-')[0]
    const order = orderBy.split('-')[1]
    allWorksQuery = allWorksQuery.orderBy(sort, order)
  } else {
    allWorksQuery = allWorksQuery.orderBy('title');
  }

  const allWorks = await allWorksQuery.execute();;

  const allWorksCount = await baseQuery
    .select((eb) => [eb.fn.countAll().as('totalCount')])
    .executeTakeFirst();

  return (
    <div className="m-auto flex-1 mt-8 w-full max-w-7xl p-8 rounded-md shadow-lg bg-no-repeat bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] max-h-[80vh] overflow-y-scroll">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular-italic text-2xl mb-4">Works</h1>
        </div>

        <div className="w-full m-auto max-w-7xl pb-16">
          <WorkIndex 
            page={page} 
            allWorks={allWorks} 
            totalCount={parseInt(allWorksCount.totalCount)} 
            itemsPerPage={itemsPerPage} 
            search={search}
            orderBy={orderBy}
          />
        </div>
      </div>
    </div>
  );
}
