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

  const workResults = await db
    .selectFrom('Work')
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
          .whereRef('Section.workId', '=', 'Work.id')
      ).as('sections'),
    ])
    .execute()

  return (
    <div id="scroll-container" className="my-4 mx-4 lg:my-auto lg:mx-0 lg:-ml-[20px] w-full max-w-7xl rounded-lg shadow-lg lg:h-[90vh] p-8 bg-repeat lg:bg-no-repeat lg:bg-cover bg-center bg-[url('/assets/bg-parchment-2.png')] overflow-y-auto outline-none">
      <div className="text-left">
        <div className="text-xl cardo-regular">
          <h1 className="im-fell-dw-pica-regular text-center text-3xl mb-4">Words Over Time</h1>
        </div>
        <WordsChart letters={letterResults} works={workResults} />
      </div>
    </div>
  );
}
