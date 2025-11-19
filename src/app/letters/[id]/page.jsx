import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import Link from 'next/link'

import LetterContainer from '@/components/letter/letter-container';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page({ params : { id }}) {
  
  const letter = await db.selectFrom('Letter')
    .where('id', '=', id)
    .select((eb) => [
      'id', 'title', 'alt_title', 'reference', 'pages', 'date_text', 'place_text', 'volume', 'related_to', 'text',
      jsonArrayFrom(
        eb.selectFrom('Commentary')
          .select(['id', 'commentator', 'text', 'url', 'title'])
          .whereRef('Commentary.letterId', '=', 'Letter.id')
      ).as('commentary'),
      jsonArrayFrom(
        eb.selectFrom('Translation')
          .select(['id', 'translator', 'text', 'language', 'url', 'title'])
          .whereRef('Translation.letterId', '=', 'Letter.id')
      ).as('translations'),
      jsonArrayFrom(
        eb.selectFrom('Source')
          .select(['id', 'title', 'url', 'author', 'publication'])
          .whereRef('Source.letterId', '=', 'Letter.id')
      ).as('sources'),
      jsonObjectFrom(
        eb.selectFrom('Metadata')
          .select(['summary', 'keywords', 'themes'])
          .whereRef('Metadata.letterId', '=', 'Letter.id')
      ).as('metadata'),
  ])
  .executeTakeFirst()

  return (
    <div className="m-auto flex-1 flex">
      <div className="m-4 lg:m-auto w-full lg:w-2/3 h-full pb-16 lg:pb-0 lg:w-[950px] lg:h-[700px] bg-no-repeat bg-cover lg:bg-contain bg-center lg:bg-[url('/assets/main-paper-bg.png')] bg-[url('/assets/mobile-parchment-bg.png')] ">
        <div className="w-full m-auto">
          <LetterContainer letter={letter} />
        </div>
      </div>
    </div>
  );
}
