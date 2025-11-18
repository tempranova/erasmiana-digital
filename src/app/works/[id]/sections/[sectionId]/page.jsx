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
            'id', 'title', 'slug', 'alt_title', 'placename', 'month', 'year',
            jsonArrayFrom(
              eb.selectFrom('Commentary')
                .select(['id', 'commentator', 'text', 'url', 'title'])
                .whereRef('Commentary.workId', '=', 'Work.id')
            ).as('commentary'),
            jsonArrayFrom(
              eb.selectFrom('Translation')
                .select(['id', 'translator', 'text', 'language', 'url', 'title'])
                .whereRef('Translation.workId', '=', 'Work.id')
            ).as('translations'),
            jsonArrayFrom(
              eb.selectFrom('Source')
                .select(['id', 'title', 'url', 'author', 'publication'])
                .whereRef('Source.workId', '=', 'Work.id')
            ).as('sources'),
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
    <div className="m-auto flex-1 flex">
      <div className="m-4 lg:m-auto w-full lg:w-2/3 h-full pb-16 lg:pb-0 lg:w-[950px] lg:h-[700px] bg-no-repeat bg-cover lg:bg-contain bg-center lg:bg-[url('/assets/main-paper-bg.png')] bg-[url('/assets/mobile-parchment-bg.png')] ">
        <div className="w-full m-auto">
          <SectionContainer section={section} nextSection={nextSection} prevSection={prevSection} numberOfPages={numberOfPages} />
        </div>
      </div>
    </div>
  );
}
