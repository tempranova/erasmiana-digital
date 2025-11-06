import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres'

import WordsChart from '@/components/charts/words-chart'

export default async function Page() {

  const letterResults = await db
    .selectFrom('Letter')
    .select([
      'id',
      'title',
      sql`array_length(regexp_split_to_array("text", '\\s+'), 1)`.as('wordCount'),
      'year', 'month', 'day',
    ])
    .execute()

  const bookResults = await db
    .selectFrom('Book')
    .select((eb) => [
      'id',
      'title',
      'year', 'month', 'day',
      jsonArrayFrom(
        eb.selectFrom('Section')
          .select((sub) => [
            sub.ref('id'),
            sql`array_length(regexp_split_to_array("text", '\\s+'), 1)`.as('wordCount')
          ])
          .whereRef('Section.bookId', '=', 'Book.id')
      ).as('sections'),
    ])
    .execute()

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <div className="max-w-7xl bg-white/90 relative p-8">
          <div className="text-xl cardo-regular">
            <h1 className="im-fell-dw-pica-regular text-4xl mb-4">Words Chart</h1>
          </div>
          <WordsChart letters={letterResults} books={bookResults} />
        </div>
      </div>
    </div>
  );
}
