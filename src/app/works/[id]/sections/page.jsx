import React from 'react';
import { db } from '@/lib/db/kysely'
import { sql } from 'kysely'

import WorkBrowse from '@/components/work/work-browse';

export default async function Page({ searchParams, params : { id }}) {

  let { page, search, pages } = await searchParams;
  if(!page) {
    page = 1;
  } else {
    page = parseInt(page)
  }
  if(pages) {
    pages = decodeURIComponent(pages)
    pages = pages.split(',')
    pages = pages.map(thisPage => parseInt(thisPage))
  }
  const itemsPerPage = 20;

  const work = await db.selectFrom('Work')
    .where('id', '=', id)
    .select((eb) => [
      'id', 'title', 'alt_title', 'placename', 'month', 'year'
    ])
    .executeTakeFirst();

  let baseQuery = db.selectFrom('Section')
    .leftJoin('Metadata', 'Metadata.sectionId', 'Section.id')
    .where('Section.workId', '=', id);

  if(search && search !== "") {
    baseQuery = baseQuery.where((eb) =>
      eb.or([
        eb('Metadata.summary', 'ilike', `%${search}%`),
        eb.exists(
          db.selectFrom(sql`unnest(${sql.ref('Metadata.keywords')})`.as('kw'))
            .select(sql`1`)
            .where(sql`kw ILIKE ${'%' + search + '%'}`)
        ),
        eb.exists(
          db.selectFrom(sql`unnest(${sql.ref('Metadata.themes')})`.as('th'))
            .select(sql`1`)
            .where(sql`th ILIKE ${'%' + search + '%'}`)
        ),
      ])
    );
  }

  if(pages && pages.length > 0) {
    baseQuery = baseQuery.where(sql`"Section"."pages" && ${sql`ARRAY[${sql.join(pages)}]::int[]`}`)
  }

  let allSectionsQuery = baseQuery
    .select([
      'Section.id', 'Section.pages', 'Metadata.summary', 'Metadata.keywords', 'Metadata.themes', 'Section.position'
    ])
    .orderBy('Section.position')
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))

  const allSections = await allSectionsQuery.execute();

  const lastPage = await db.selectFrom('Section')
    .where('workId', '=', parseInt(id))
    .select((eb) => [
      'id', 'pages'
    ])
    .orderBy('pages', 'desc')
  .executeTakeFirst()

  const allSectionsCount = await baseQuery
    .select((eb) => [eb.fn.countAll().as('totalCount')])
    .executeTakeFirst();

  return (
    <div id="scroll-container" className="my-4 mx-4 lg:my-auto lg:mx-0 lg:-ml-[20px] w-full max-w-7xl rounded-lg shadow-lg min-h-[90vh] p-8 bg-repeat lg:bg-no-repeat lg:bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] overflow-y-auto outline-none">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-center text-3xl mb-4">{work.title}</h1>
        </div>
        <WorkBrowse work={work} lastPage={lastPage} pages={pages} allSections={allSections} page={page} totalCount={allSectionsCount.totalCount} itemsPerPage={itemsPerPage} search={search} />
      </div>
    </div>
  );
}
