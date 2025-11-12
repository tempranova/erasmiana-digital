import React from 'react';
import { db } from '@/lib/db/kysely'
import { sql } from 'kysely'

import WorkBrowse from '@/components/work/work-browse';

export default async function Page({ searchParams, params : { id }}) {

  let { page, search } = searchParams;
  if(!page) {
    page = 1;
  } else {
    page = parseInt(page)
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

  let allSectionsQuery = baseQuery
    .select([
      'Section.id', 'Section.pages', 'Metadata.summary', 'Metadata.keywords', 'Metadata.themes', 'Section.position'
    ])
    .orderBy('Section.position')
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))

  const allSections = await allSectionsQuery.execute();;

  const allSectionsCount = await baseQuery
    .select((eb) => [eb.fn.countAll().as('totalCount')])
    .executeTakeFirst();

  return (
    <div className="m-auto flex-1 mt-8 w-full max-w-7xl p-8 rounded-md shadow-lg bg-no-repeat bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] max-h-[80vh] overflow-y-scroll">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular-italic text-2xl mb-4">{work.title}</h1>
        </div>
        <WorkBrowse work={work} allSections={allSections} page={page} totalCount={allSectionsCount.totalCount} itemsPerPage={itemsPerPage} search={search} />
      </div>
    </div>
  );
}
