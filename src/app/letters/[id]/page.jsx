import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'

import TopNav from '@/components/nav/top-nav'
import Work from '@/components/work/work-container';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page({ params : { id }}) {
  
  const work = await db.selectFrom('Work')
    .where('type', '=', 'letter')
    .where('id', '=', id)
    .select((eb) => [
      'Work.id', 'Work.title', 'Work.type', 'Work.alt_title',
      jsonObjectFrom(
        eb.selectFrom('Metadata')
          .select(['id', 'reference', 'pages', 'date_text', 'placename', 'volume', 'related_to'])
          .whereRef('Metadata.workId', '=', 'Work.id')
      ).as('metadata'),
      jsonArrayFrom(
        eb.selectFrom('Entry')
          .select(['id', 'position', 'text'])
          .whereRef('Entry.workId', '=', 'Work.id')
      ).as('entries'),
      jsonArrayFrom(
        eb.selectFrom('Commentary')
          .select(['id', 'commentator', 'text', 'url'])
          .whereRef('Commentary.workId', '=', 'Work.id')
      ).as('commentary'),
      jsonArrayFrom(
        eb.selectFrom('Translation')
          .select(['id', 'translator', 'text', 'language'])
          .whereRef('Translation.workId', '=', 'Work.id')
      ).as('translations'),
      jsonArrayFrom(
        eb.selectFrom('Source')
          .select(['id', 'name', 'url'])
          .whereRef('Source.workId', '=', 'Work.id')
      ).as('sources'),
      jsonObjectFrom(
        eb.selectFrom('Summary')
          .select(['id', 'text'])
          .whereRef('Summary.workId', '=', 'Work.id')
      ).as('summary'),
      jsonObjectFrom(
        eb.selectFrom('Themes')
          .select(['id', 'themes'])
          .whereRef('Themes.workId', '=', 'Work.id')
      ).as('themes'),
      jsonObjectFrom(
        eb.selectFrom('Keywords')
          .select(['id', 'keywords'])
          .whereRef('Keywords.workId', '=', 'Work.id')
      ).as('keywords'),
  ])
  .executeTakeFirst()

  return (
    <div>
      <div className="fixed inset-0 -z-10 bg-right bg-cover bg-no-repeat bg-[url('/assets/erasmus-bg.jpg')]" />
      <TopNav />
      <div className="w-full m-auto max-w-7xl pb-16">
        <Work work={work} />
      </div>
    </div>
  );
}
