import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'

import WorkContainer from '@/components/work/work-container';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page({ params : { id }}) {
  
  const work = await db.selectFrom('Work')
    .where('id', '=', id)
    .select((eb) => [
      'id', 'title', 'alt_title', 'placename', 'month', 'year',
      jsonArrayFrom(
        eb.selectFrom('Section')
          .select((eb) => [
            'id', 'title', 'position',
            jsonObjectFrom(
              eb.selectFrom('Metadata')
                .select(['summary', 'keywords', 'themes'])
                .whereRef('Metadata.sectionId', '=', 'Section.id')
            ).as('metadata'),
          ])
          .whereRef('Section.workId', '=', 'Work.id')
      ).as('sections'),
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
  .executeTakeFirst()

  work.sections.sort((a, b) => a.position > b.position ? 1 : -1);

  return (
    <div className="m-auto flex-1 mt-8 w-full h-[720px] max-h-[720px] pb-10 bg-no-repeat bg-contain bg-center bg-[url('/assets/main-paper-bg.png')]">
      <div className="w-[110vh] m-auto">
        <WorkContainer work={work} />
      </div>
    </div>
  );
}
