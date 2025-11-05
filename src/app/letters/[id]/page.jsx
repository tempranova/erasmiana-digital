import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'

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
        eb.selectFrom('Summary')
          .select(['id', 'text'])
          .whereRef('Summary.letterId', '=', 'Letter.id')
      ).as('summary'),
      jsonObjectFrom(
        eb.selectFrom('Themes')
          .select(['id', 'themes'])
          .whereRef('Themes.letterId', '=', 'Letter.id')
      ).as('themes'),
      jsonObjectFrom(
        eb.selectFrom('Keywords')
          .select(['id', 'keywords'])
          .whereRef('Keywords.letterId', '=', 'Letter.id')
      ).as('keywords'),
  ])
  .executeTakeFirst()

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <LetterContainer letter={letter} />
      </div>
    </div>
  );
}
