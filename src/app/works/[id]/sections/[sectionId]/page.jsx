import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'

import SectionContainer from '@/components/work/section-container';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page({ params : { id, sectionId }}) {
  
  const section = await db.selectFrom('Section')
    .where('id', '=', parseInt(sectionId))
    .select((eb) => [
      'id', 'position', 'text', 'pages',
      jsonObjectFrom(
        eb.selectFrom('Metadata')
          .select(['summary', 'keywords', 'themes'])
          .whereRef('Metadata.sectionId', '=', 'Section.id')
      ).as('metadata'),
      jsonObjectFrom(
        eb.selectFrom('Work')
          .select((eb) => [
            'id', 'title', 'alt_title', 'placename', 'month', 'year',
          ])
          .whereRef('Work.id', '=', 'Section.workId')
      ).as('work')
  ])
  .executeTakeFirst()

  const nextSection = await db.selectFrom('Section')
    .select('id')
    .where('position', '=', parseInt(section.position) + 1)
    .where('workId', '=', parseInt(id))
    .executeTakeFirst()

  const prevSection = await db.selectFrom('Section')
    .select('id')
    .where('position', '=', parseInt(section.position) - 1)
    .where('workId', '=', parseInt(id))
    .executeTakeFirst()

  const lastPage = await db.selectFrom('Section')
    .where('workId', '=', parseInt(id))
    .select((eb) => [
      'id', 'pages'
    ])
    .orderBy('pages', 'desc')
  .executeTakeFirst()

  const numberOfPages = lastPage.pages[lastPage.pages.length - 1];

  return (
    <div className="m-auto flex-1 mt-8 w-full h-[720px] max-h-[720px] pb-10 bg-no-repeat bg-contain bg-center bg-[url('/assets/main-paper-bg.png')]">
      <div className="w-[110vh] m-auto">
        <SectionContainer section={section} nextSection={nextSection} prevSection={prevSection} numberOfPages={numberOfPages} />
      </div>
    </div>
  );
}
